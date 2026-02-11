import { HttpError } from "$lib/shared/httpresponse/errors";

export class ValidationError extends HttpError {
    constructor(message: string = "Validation failed") {
        super(message, 422);
    }
}
