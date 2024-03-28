const Comment = require("../database/models/Comment.model")
const commentValidation = require("../validations/commentValidation")
const idValidation = require("../validations/idValidation")
const { NotFoundApiError } = require("../utils/ApiErrors")
const User = require("../database/models/User.model")
const Checklist = require("../database/models/Checklist.model")
const removeIdFromArray = require("../utils/removeIdFromArray")

class CommentController {

    static async reply(request, response) {
        const { id } = idValidation.parse(request.params)
        const { id: postId } = idValidation.parse(request.body)
        const { content } = commentValidation.parse(request.body)

        const parentComment = await Comment.findById(id)
        if (!parentComment) throw new NotFoundApiError("O comentário pai não existe.")

        const post = await User.findById(postId) || await Checklist.findById(postId)
        if (!post) throw new NotFoundApiError("Post não encontrado.")

        const userComment = { content, post: post._id }
        userComment.author = request.userRequest._id
        userComment.createdAt = new Date()
        userComment.parent = parentComment._id

        const comment = new Comment(userComment)
        parentComment.comments.push(comment._id)

        await comment.save()
        await parentComment.save()

        response.status(201).json({ comment })
    }

    static async delete(request, response) {
        const { id } = idValidation.parse(request.params)
        const comment = await Comment.findById(id)

        if (!comment) throw new NotFoundApiError("Comentário não encontrado!")

        if (comment.parent) {
            const commentParent = await Comment.findById(comment.parent)
            removeIdFromArray(commentParent.comments, comment._id)
            await commentParent.save()
        } else {
            // se não tiver parent quer dizer que é um comentário nivel superior, ou seja o pai de todos.
            // removemos o comentário pai do array de comentarios do post, podendo ser do post de User ou Checklist
            const post = await User.findById(comment.post) || await Checklist.findById(comment.post)
            removeIdFromArray(post.comments, comment._id)
            await post.save()
        }

        await CommentController.#deleteCommentAndChildren(comment._id)

        response.status(200).json({ comment })
    }

    static async #deleteCommentAndChildren(commentId) {
        await Comment.deleteOne({ _id: commentId })

        const children = await Comment.find({ parent: commentId })
        for (const child of children) {
            await CommentController.#deleteCommentAndChildren(child._id)
        }
    }
}

module.exports = CommentController