class ApiError extends Error {
    constructor(message, code) {
        super(message)
        this.code = code
    }
}

class BadRequestApiError extends ApiError {
    constructor(message) {
        super(message, 400)
    }
}

class UnauthorizedApiError extends ApiError {
    constructor(message) {
        super(message, 401)
    }
}

class NotFoundApiError extends ApiError {
    constructor(message) {
        super(message, 404)
    }
}

module.exports = { ApiError, BadRequestApiError, UnauthorizedApiError, NotFoundApiError }