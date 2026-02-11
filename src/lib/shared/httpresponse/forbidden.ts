import { HttpError } from "$lib/shared/httpresponse/errors";

export class ForbiddenError extends HttpError {
    constructor(message: string = "Forbidden") {
        super(message, 403);
    }
}
