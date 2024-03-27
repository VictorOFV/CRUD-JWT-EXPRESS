const { z } = require("zod")

const commentValidation = z.object({
    content: z.string().min(1, "Seu comentário deve conter no minimo 1 caracter!").max(200, "Seu comentário deve conter no maxímo 200 caracteres.")
})

module.exports = commentValidation