import { HttpError } from "$lib/shared/httpresponse/errors";

export class ConflictError extends HttpError {
    constructor(message: string = "Conflict") {
        super(message, 409);
    }
}
