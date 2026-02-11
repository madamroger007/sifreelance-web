import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { signUpSchema } from "$lib/shared/validators/auth.schema";
import { serviceRegisterUser } from "$lib/server/services/auth/register-user";
import { sendVerificationEmail } from "$lib/server/mail/auth/send-verification-email";

export const actions: Actions = {
    default: async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        const parsedUser = signUpSchema.safeParse(data);
        if (!parsedUser.success) {
            return fail(400, {
                error: parsedUser.error.message,
                fields: parsedUser.error.message
            })
        }
        try {
            await serviceRegisterUser({
                name: parsedUser.data.name,
                email: parsedUser.data.email,
                password: parsedUser.data.password,
            });
            await sendVerificationEmail(parsedUser.data.email);
        } catch (error) {
            return fail(500, { error: error instanceof Error ? error.message : String(error) });
        }

        throw redirect(302, "/login?verify=true");

    }
};
