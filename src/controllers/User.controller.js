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
            console.log(`[ SERVER ] - Erro interno no servidor.`.red, error.message)
            response.status(500).json({ message: "Erro interno no servidor" })
        }
    }

    static async store(request, response) {
        const { name, email, password, confirmPassword } = request.body

        if (!name || !email || !password || !confirmPassword) return response.status(400).json({ message: "Há dados faltando." })
        if (password !== confirmPassword) return response.status(400).json({ message: "Senha não confere." })

        try {
            const emailExist = await User.exists({ email })

            if (emailExist) return response.status(400).json({ message: "Por favor utilize um email diferente!" })

            const bcryptSalt = await bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(password, bcryptSalt)
            const user = new User({ email, name, password: passwordHash })

            await user.save()
            response.status(201).json({ message: "Usuário cadastrado com sucesso!" })
        } catch (error) {
            console.log(`[ SERVER ] - Erro interno no servidor.`.red, error.message)
            response.status(500).json({ message: "Erro interno no servidor." })
        }
    }

    static async update(request, response) {
        const { id } = request.params
        const { name, email } = request.body

        if (!name || !email) return response.status(400).json({ message: "Há dados faltando." })

        try {
            const emailExist = await User.exists({ email, _id: { $ne: id } })

            if (emailExist) return response.status(400).json({ message: "Por favor utilize um email diferente!" })

            const user = await User.findByIdAndUpdate(id, { name, email })
            
            if (!user) return response.status(404).json({ message: "Usuário não encontrado!" })
            response.status(200).json({ message: "Usuário atualizado com sucesso" })
        } catch (error) {
            console.log(`[ SERVER ] - Erro interno no servidor.`.red, error.message)
            response.status(500).json({ message: "Erro interno no servidor." })
        }
    }

    static async delete(request, response) {
        const { id } = request.params

        try {
            const user = await User.findByIdAndDelete(id)

            if (!user) return response.status(404).json({ message: "Usuário não encontrado." })
            response.status(200).json({ message: "Usuário deletado com sucesso!" })
        } catch (error) {
            console.log(`[ SERVER ] - Erro interno no servidor.`.red, error.message)
            response.status(500).json({ message: "Erro interno no servidor" })
        }
    }
}

module.exports = UserControler