import { HttpError } from "$lib/shared/httpresponse/errors";

export class NotFoundError extends HttpError {
    constructor(message: string = "Not found") {
        super(message, 404);
    }
}
