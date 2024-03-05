const { z } = require("zod")
const path = require("node:path")

const allowExtension = ['.jpeg', '.jpg', '.png', '.gif'];

const imageValidation = z.object({
    filename: z.string(),
    originalname: z.string(),
    path: z.string(),
    mimetype: z.string().refine(mimetype => mimetype.startsWith('image/'), {
        message: 'O arquivo deve ser uma imagem.'
    }),

    size: z.number().min(1).max(5 * 1024 * 1024, "O tamanho maximo da imagem não deve ultrapassar 5MB") // Entre 1 byte e 5MB
}).refine(data => {
    const extension = path.extname(data.originalname)
    return allowExtension.includes(extension)
}, { message: "O arquivo de imagem deve ser no formato de .JPGE, .JPG, .PNG ou .GIF" })

module.exports = imageValidation