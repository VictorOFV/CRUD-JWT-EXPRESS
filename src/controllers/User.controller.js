const bcrypt = require("bcrypt")
const User = require("../database/models/User.model")

class UserControler {

    static async index(request, response) {
        const users = await User.find({}, "-password")
        response.status(200).json({ users })
    }

    static async show(request, response) {
        const { id } = request.params

        try {
            const user = await User.findById(id, "-password")

            if (!user) return response.status(404).json({ message: "Usuário não encontrado" })

            response.status(200).json({ user })
        } catch (error) {
            console.log(error)
            response.status(500).json({ message: "Erro interno no servidor" })
        }
    }

}

module.exports = UserControler