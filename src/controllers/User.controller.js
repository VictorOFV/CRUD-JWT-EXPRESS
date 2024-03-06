const bcrypt = require("bcrypt")
const User = require("../database/models/User.model")
const userCreateValidation = require("../validations/userCreateValidation")
const userUpdateValidation = require("../validations/userUpdateValidation")
const idValidation = require("../validations/idValidation")
const { NotFoundApiError, BadRequestApiError } = require("../utils/ApiErrors")
const imageValidation = require("../validations/imagesValidation")
const deleteFile = require("../utils/deleteFile")

class UserControler {

    static async index(request, response, next) {
        const users = await User.find({})
        response.status(200).json({ users })
    }

    static async show(request, response, next) {
        const { id } = idValidation.parse(request.params)
        const user = await User.findById(id)

        if (!user) throw new NotFoundApiError("Usuário não encontrado.")

        response.status(200).json({ user })
    }

    static async store(request, response, next) {
        const { name, email, password, username } = userCreateValidation.parse(request.body)

        const emailExist = await User.exists({ email })
        const usernameExist = await User.exists({ username })

        if (emailExist) throw new BadRequestApiError("Por favor utilize um email diferente!")
        if (usernameExist) throw new BadRequestApiError("Por favor utilize um username diferente!")

        const bcryptSalt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, bcryptSalt)
        const user = new User({ email, name, password: passwordHash, username })

        await user.save()
        response.status(201).json(user)
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
        response.status(200).json(user)
    }

    static async delete(request, response, next) {
        const { id } = idValidation.parse(request.params)
        const user = await User.findByIdAndDelete(id)

        if (!user) throw new NotFoundApiError("Usuário não encontrado.")
        response.status(200).json({ message: "Usuário deletado com sucesso!" })
    }
}

module.exports = UserControler