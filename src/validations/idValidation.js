const { isValidObjectId } = require("mongoose")
const { z } = require("zod")

const idValidation = z.object({
    id: z.string()
})
.refine(data=> isValidObjectId(data.id), "Informe um ID valido.")

module.exports = idValidation