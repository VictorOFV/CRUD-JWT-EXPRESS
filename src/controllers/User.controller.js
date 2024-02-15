const bcrypt = require("bcrypt")
const User = require("../database/models/User.model")
const userCreateValidation = require("../validations/userCreateValidation")
const userUpdateValidation = require("../validations/userUpdateValidation")
const idValidation = require("../validations/idValidation")

class UserControler {

    static async index(request, response, next) {
        const users = await User.find({}, "-password")
        response.status(200).json({ users })
    }

    static async show(request, response, next) {
        const { id } = idValidation.parse(request.params)
        const user = await User.findById(id, "-password")

        if (!user) return response.status(404).json({ message: "Usuário não encontrado" })

        response.status(200).json({ user })
    }

    static async store(request, response, next) {
        const { name, email, password } = userCreateValidation.parse(request.body)

        const emailExist = await User.exists({ email })

        if (emailExist) return response.status(400).json({ message: "Por favor utilize um email diferente!" })

        const bcryptSalt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, bcryptSalt)
        const user = new User({ email, name, password: passwordHash })

        await user.save()
        response.status(201).json({ message: "Usuário cadastrado com sucesso!" })
    }

    static async update(request, response, next) {
        const { id } = idValidation.parse(request.params)
        const { name, email } = userUpdateValidation.parse(request.body)
        const emailExist = await User.exists({ email, _id: { $ne: id } })

        if (emailExist) return response.status(400).json({ message: "Por favor utilize um email diferente!" })

        const user = await User.findByIdAndUpdate(id, { name, email })

        if (!user) return response.status(404).json({ message: "Usuário não encontrado!" })
        response.status(200).json({ message: "Usuário atualizado com sucesso" })
    }

    static async delete(request, response, next) {
        const { id } = idValidation.parse(request.params)
        const user = await User.findByIdAndDelete(id)

        if (!user) return response.status(404).json({ message: "Usuário não encontrado." })
        response.status(200).json({ message: "Usuário deletado com sucesso!" })
    }
}

module.exports = UserControler