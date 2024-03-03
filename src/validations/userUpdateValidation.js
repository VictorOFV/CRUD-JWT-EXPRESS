const { z } = require("zod")

const userUpdateValidation = z.object({
    name: z.string().min(2, "Seu nome deve conter pelo menos 2 digitos").max(30, "Seu nome deve conter no maximo 30 digitos."),
    email: z.string().email("Por favor utilize um email valido."),
    username: z.string().min(2, "O username deve conter pelo menos 2 caracteres.").max(15, "O username de conter no maximo 15 caracteres.").toLowerCase(),
    dateOfBirth: z.string().nullable(),
    gender: z.literal("male").or(z.literal("female")).or(z.literal("other")).nullable(),
    bio: z.string().max(250, "A bio pode conter no maximo 250 caracteres.").nullable()
})

module.exports = userUpdateValidation