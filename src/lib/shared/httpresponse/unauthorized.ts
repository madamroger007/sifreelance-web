import { HttpError } from "$lib/shared/httpresponse/errors";

export class UnauthorizedError extends HttpError {
    constructor(message: string = "Unauthorized") {
        super(message, 401);
    }
}
