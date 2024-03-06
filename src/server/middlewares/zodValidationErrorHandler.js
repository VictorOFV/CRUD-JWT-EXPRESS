const path = require("node:path")
const fs = require("node:fs")

function zodValidationErrorHandler(error, request, response, next) {

    if (error.name === "ZodError") {

        if (request.files) { // Se for um erro do zod e tiver um file, ele deve remover os arquivos, ja que ele ta validando o mesmo.
            const files = request.files

            for (let file in files) {
                files[file].map(fileInfo => {
                    const pathFile = path.resolve(fileInfo.path)
                    fs.unlinkSync(pathFile)
                })
            }
        }

        return response.status(400).json({ message: error.issues[0].message });
    }
    next(error);
}

module.exports = zodValidationErrorHandler