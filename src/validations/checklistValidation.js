const { z } = require("zod")
const { isValidObjectId } = require("mongoose")

const checklistValidation = z.object({
    name: z.string().min(2, "O nome do checklist precisa ter no minimo 2 caracteres."),
    description: z.string().min(10, "A descrição do checklist precisa ter no minimo 10 caracteres."),
    author: z.string()
})
.refine(data=> isValidObjectId(data.author), "Informe um ID de um autor valido.")

module.exports = checklistValidation