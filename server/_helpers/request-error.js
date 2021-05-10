class RequestError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const handleError = (error, res) => res.status(error.statusCode? error.statusCode : 500)
                                .json({ message: error.message })

module.exports = {
    RequestError,
    handleError
}