import { HttpError } from "$lib/shared/httpresponse/errors";

export class InternalServerError extends HttpError {
    constructor(message: string = "Server error") {
        super(message, 500);
    }
}
