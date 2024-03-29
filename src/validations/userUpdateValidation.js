const { z } = require("zod")

const userUpdateValidation = z.object({
    name: z.string().min(2, "Seu nome deve conter pelo menos 2 digitos").max(15, "Seu nome deve conter no maximo 15 digitos."),
    email: z.string().email("Por favor utilize um email valido.")
})

module.exports = userUpdateValidation