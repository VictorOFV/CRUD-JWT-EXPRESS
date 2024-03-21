const { z } = require("zod")
const { jobs } = require("../utils/jobs.json")

const userUpdateValidation = z.object({
    name: z.string().min(2, "Seu nome deve conter pelo menos 2 digitos").max(30, "Seu nome deve conter no maximo 30 digitos."),
    email: z.string().email("Por favor utilize um email valido."),
    username: z.string().min(2, "O username deve conter pelo menos 2 caracteres.").max(15, "O username de conter no maximo 15 caracteres.").toLowerCase(),
    dateOfBirth: z.string().nullable().optional(),
    gender: z.literal("male").or(z.literal("female")).or(z.literal("other")).nullable().optional(),
    bio: z.string().max(160, "A bio pode conter no maximo 250 caracteres.").nullable().optional(),
    location: z.string().max(30, "A localização pode conter no maximo 30 caracteres.").nullable().optional(),
    site: z.string().max(50, "A url pode conter no maximo 50 caracteres").nullable().optional(),
    profession: z.string().nullable().optional()
})
.refine(data => jobs.includes(data.profession) || data.profession === null || data.profession === undefined, "String diferente do esperado!")
.refine(data => {
    try {
        if(data.site === null || data.site === undefined) return true
        new URL(data.site)
        return true
    } catch {
        return false
    }
}, "A string não é uma URL!")

module.exports = userUpdateValidation