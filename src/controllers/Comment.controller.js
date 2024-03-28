const Comment = require("../database/models/Comment.model")
const commentValidation = require("../validations/commentValidation")
const idValidation = require("../validations/idValidation")
const { NotFoundApiError } = require("../utils/ApiErrors")

class CommentController {

    static async reply(request, response) {
        const { id } = idValidation.parse(request.params)
        const { content } = commentValidation.parse(request.body)

        const parentComment = await Comment.findById(id)

        if (!parentComment) throw new NotFoundApiError("O comentário pai não existe.")

        const userComment = { content }
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

        if(comment.parent) {
            const commentParent = await Comment.findById(comment.parent)
            const commentIndex = commentParent.comments.findIndex(commentId => commentId.toString() === comment._id.toString())
            commentParent.comments.splice(commentIndex, 1)
            await commentParent.save()
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