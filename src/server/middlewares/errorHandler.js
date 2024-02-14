function errorHandler(error, request, response, next) {
    console.log(`[ SERVER ] - Erro interno no servidor.`.red, error)
    return response.status(500).json({ message: "Erro interno no servidor" });
}

module.exports = errorHandler