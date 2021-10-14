class ValidationError extends Error {

    constructor(message?: string) {
        super();
        this.message = message;
        this.name = "ValidationError";
        this.stack = new Error().stack;
    }

}

export default ValidationError;
