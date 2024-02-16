const { z } = require("zod")
const { isValidObjectId } = require("mongoose")

const taskValidation = z.object({
    name: z.string().min(2, "O nome do task precisa ter no minimo 2 caracteres."),
    description: z.string().min(10, "A descrição do task precisa ter no minimo 10 caracteres."),
    done: z.boolean(),
    checklist: z.string()
})
.refine(data=> isValidObjectId(data.checklist), "Informe um ID de uma task valida.")

module.exports = taskValidation