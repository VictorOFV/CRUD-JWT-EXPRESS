function apiErrorHandle(error, request, response, next) {
    const { code, message } = error

    if (code) {
        return response.status(code).json({ message })
    }

    next(error)
}

module.exports = apiErrorHandle