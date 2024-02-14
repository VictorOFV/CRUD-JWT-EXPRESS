function zodValidationErrorHandler(error, request, response, next) {
    if (error.name === "ZodError") {
        return response.status(400).json({ message: error.issues[0].message });
    }
    next(error);
}

module.exports = zodValidationErrorHandler