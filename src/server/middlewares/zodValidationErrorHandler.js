const path = require("node:path")
const fs = require("node:fs")

function zodValidationErrorHandler(error, request, response, next) {

    if (error.name === "ZodError") {

        if (request.file && request.file.path) { // Se for um erro do zod e tiver um file, ele deve remover o arquivo, ja que ele ta validando o mesmo
            const pathFile = path.resolve(request.file.path)
            fs.unlinkSync(pathFile)
        }

        return response.status(400).json({ message: error.issues[0].message });
    }
    next(error);
}

module.exports = zodValidationErrorHandler