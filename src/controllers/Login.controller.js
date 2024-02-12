const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../database/models/User.model")

class LoginControler {

    static async store(request, response) {
        const { email, password } = request.body

        if (!email) return response.status(400).json({ messsage: "Email não informado." })
        if (!password) return response.status(400).json({ message: "Senha não informada." })

        try {
            const user = await User.findOne({ email })

            if (!user) return response.status(401).json({ message: "Email ou senha incorreta." })

            const compare = await bcrypt.compare(password, user.password)

            if (!compare) return response.status(401).json({ message: "Email ou senha incorreta." })

            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY_JWT, { expiresIn: "5m" })
            const userWithoutPassword = user.toObject();
            delete userWithoutPassword.password;

            response.status(200).json({ user: userWithoutPassword, token })
        } catch (error) {
            console.log(`[ SERVER ] - Erro interno no servidor.`.red, error)
            response.status(500).json({ message: "Erro interno no servidor." })
        }
    }
}

module.exports = LoginControler