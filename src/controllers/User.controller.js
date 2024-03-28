const bcrypt = require("bcrypt")
const User = require("../database/models/User.model")
const userCreateValidation = require("../validations/userCreateValidation")
const userUpdateValidation = require("../validations/userUpdateValidation")
const idValidation = require("../validations/idValidation")
const { NotFoundApiError, BadRequestApiError } = require("../utils/ApiErrors")
const imageValidation = require("../validations/imagesValidation")
const deleteFile = require("../utils/deleteFile")
const changePasswordValidation = require("../validations/changePasswordValidation")
const commentValidation = require("../validations/commentValidation")
const Comment = require("../database/models/Comment.model")

class UserControler {

    static async index(request, response, next) {
        const users = await User.find({})
        response.status(200).json({ users })
    }

    static async show(request, response, next) {
        const { username } = request.params
        const user = await User.findOne({ username })

        if (!user) throw new NotFoundApiError("Usuário não encontrado.")

        response.status(200).json({ user })
    }

    static async store(request, response, next) {
        const userData = userCreateValidation.parse(request.body)

        const emailExist = await User.exists({ email: userData.email })
        const usernameExist = await User.exists({ username: userData.username })

        if (emailExist) throw new BadRequestApiError("Por favor utilize um email diferente!")
        if (usernameExist) throw new BadRequestApiError("Por favor utilize um username diferente!")

        userData.createdAt = new Date()

        const bcryptSalt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(userData.password, bcryptSalt)
        const user = new User({ ...userData, password: passwordHash })

        await user.save()
        response.status(201).json({ user })
    }

    static async update(request, response, next) {
        const { id } = idValidation.parse(request.params)
        const userInfo = userUpdateValidation.parse(request.body)

        const emailExist = await User.exists({ email: userInfo.email, _id: { $ne: id } })
        const usernameExist = await User.exists({ username: userInfo.username, _id: { $ne: id } })

        if (emailExist) throw new BadRequestApiError("Por favor utilize um email diferente!")
        if (usernameExist) throw new BadRequestApiError("Por favor utilize um username diferente!")

        if (request.files) {
            const files = request.files;

            for (let file in files) {
                await Promise.all(files[file].map(async fileInfo => {
                    const { path } = imageValidation.parse(fileInfo);
                    userInfo[file] = path;
                    const user = await User.findById(id);

                    if (user && user[file]) {
                        await deleteFile(user[file]);
                    }
                }));
            }
        }

        const user = await User.findByIdAndUpdate(id, userInfo, { new: true })

        if (!user) throw new NotFoundApiError("Usuário não encontrado.")
        response.status(200).json({ user })
    }

    static async delete(request, response, next) {
        const { id } = idValidation.parse(request.params)
        const user = await User.findByIdAndDelete(id)

        if (!user) throw new NotFoundApiError("Usuário não encontrado.")
        response.status(200).json({ message: "Usuário deletado com sucesso!" })
    }

    static async changePassword(request, response) {
        const { id } = idValidation.parse(request.params)
        const { newPassword, oldPassword } = changePasswordValidation.parse(request.body)
        const user = await User.findById(id)

        if (!user) throw new NotFoundApiError("Usuário não encontrado.")

        const comparePassword = await bcrypt.compare(oldPassword, user.password)

        if (!comparePassword) throw new BadRequestApiError("Senha incorreta!")

        const bcryptSalt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(newPassword, bcryptSalt)

        user.password = newHashPassword
        await user.save()

        response.status(200).json({ message: "A senha foi modificada com sucesso!" })
    }

    static async followUser(request, response) {
        const { id } = idValidation.parse(request.params)
        const user = await User.findById(id)

        if (!user) throw new NotFoundApiError("Usuário não encontrado.")
        if (user._id.toString() === request.userRequest._id.toString()) throw new BadRequestApiError("Você não pode seguir você mesmo!")
        if (user.followers.includes(request.userRequest._id) && request.userRequest.following.includes(user._id)) throw new BadRequestApiError("Você já segue esse usuário")

        user.followers.push(request.userRequest._id)
        request.userRequest.following.push(user._id)

        await user.save()
        await request.userRequest.save()

        response.status(200).json({ user: request.userRequest })
    }

    static async unfollowUser(request, response) {
        const { id } = idValidation.parse(request.params)
        const user = await User.findById(id)

        if (!user) throw new NotFoundApiError("Usuário não encontrado.")
        if (user._id.toString() === request.userRequest._id.toString()) throw new BadRequestApiError("Você não desseguir você mesmo!")
        if (!user.followers.includes(request.userRequest._id) && !request.userRequest.following.includes(user._id)) throw new BadRequestApiError("Você não segue esse usuário")

        const followerIndex = user.followers.indexOf(request.userRequest._id)
        const followingIndex = request.userRequest.following.indexOf(user._id)

        request.userRequest.following.splice(followingIndex, 1);
        user.followers.splice(followerIndex, 1)

        await user.save()
        await request.userRequest.save()

        response.status(200).json({ user: request.userRequest })
    }

    static async createComment(request, response) {
        const { id } = idValidation.parse(request.params)
        const { content } = commentValidation.parse(request.body)
        const user = await User.findById(id)

        if (!user) throw new NotFoundApiError("Usuário não encontrado.")

        const commentUser = { content }
        commentUser.author = request.userRequest._id
        commentUser.post = user._id
        commentUser.createdAt = new Date()

        const comment = new Comment(commentUser)
        user.comments.push(comment._id)

        await comment.save()
        await user.save()

        response.status(201).json({ comment })
    }
}

module.exports = UserControler