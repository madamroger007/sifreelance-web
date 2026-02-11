import { HttpError } from "$lib/shared/httpresponse/errors";

export class BadRequestError extends HttpError {
    constructor(message: string = "Bad request") {
        super(message, 400);
    }
}
