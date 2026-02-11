import bcrypt from 'bcrypt';
import { findAuthUserByEmail } from '$lib/server/db/repositories/user.repository';
import { ConflictError } from '$lib/shared/httpresponse/conflict';
import { signInSchema } from '$lib/shared/validators/auth.schema';

export async function validateUser(email: string, password: string) {
    const parsed = signInSchema.safeParse({ email, password });
    if (!parsed.success) {
        throw new ConflictError("Invalid email or password");
    }
    const user = await findAuthUserByEmail(parsed.data.email);
    if (!user || !user.password) {
        throw new ConflictError("Invalid email or password");
    }

    if (!user.emailVerified) {
        throw new ConflictError("Email not verified");
    }

    const isPasswordValid = await bcrypt.compare(parsed.data.password, user.password);
    if (!isPasswordValid) {
        throw new ConflictError("Invalid email or password");
    }
    return user;
}
