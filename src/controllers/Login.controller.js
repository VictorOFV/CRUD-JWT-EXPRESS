const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../database/models/User.model")
const loginValidation = require("../validations/loginValidation")
const { UnauthorizedApiError } = require("../utils/ApiErrors")

class LoginControler {

    static async store(request, response, next) {
        const { email, password } = loginValidation.parse(request.body)
        const user = await User.findOne({ email })

        if (!user) throw new UnauthorizedApiError("Email ou senha incorreta.")

        const compare = await bcrypt.compare(password, user.password)

        if (!compare) throw new UnauthorizedApiError("Email ou senha incorreta.")

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY_JWT, { expiresIn: "5m" })
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        response.status(200).json({ user: userWithoutPassword, token })
    }
}

module.exports = LoginControler