const { z } = require("zod")

const loginValidation = z.object({
    email: z.string().email("Por favor utilize um email valido."),
    password: z.string().min(8, "A senha deve conter pelo menos 8 digitos.").max(30, "A senha deve conter no maximo 30 digitos.")
})

module.exports = loginValidation