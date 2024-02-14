const { z } = require("zod")

const loginValidation = z.object({
    email: z.string().email("Por favor utilize um email valido."),
    password: z.string().min(8, "A senha deve conter pelo menos 8 digitos.").max(15, "A senha deve conter no maximo 15 digitos.")
})

module.exports = loginValidation