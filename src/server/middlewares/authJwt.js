const jwt = require("jsonwebtoken")
const User = require("../../database/models/User.model")

async function authJwt(request, response, next) {
    const { authorization } = request.headers

    if (!authorization) return response.status(401).json({ message: "Não autorizado" })

    const token = authorization.split(" ")[1]

    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY_JWT)

        if (!id) return response.status(401).json({ message: "Não autorizado" })

        const user = await User.findById(id)

        if (!user) return response.status(401).json({ message: "Não autorizado" })

        next()
    } catch (error) {
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return response.status(401).json({ message: "Não autorizado" });
        }

        console.log(`[ SERVER ] - Erro interno no servidor.`.red, error)
        response.status(500).json({ message: "Erro interno no servidor." })
    }
}

module.exports = authJwt