import { createAuthUser, findAuthUserByEmail } from "$lib/server/db/repositories/user.repository";
import { ConflictError } from "$lib/shared/httpresponse/conflict";
import bcrypt from "bcrypt";
export async function serviceRegisterUser(data: {
    email: string;
    password?: string;
    name?: string;
}) {
    // Implementation to register a new user
    const existingUser = await findAuthUserByEmail(data.email);

    if (existingUser) {
        throw new ConflictError("User with this email already exists");
    }

    const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : undefined;
    const newUser = await createAuthUser({
        ...data,
        password: hashedPassword,
    });

    return newUser;
}