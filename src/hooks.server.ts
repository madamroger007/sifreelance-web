import { sequence } from '@sveltejs/kit/hooks';

import { handle as AutHandle } from './routes/api/auth/[...auth]/+server';
import { redirect } from '@sveltejs/kit';

const authorizationHandler = async ({ event, resolve }: { event: any; resolve: any }) => {
    const session = await event.locals.auth();
    const pathname = event.url.pathname;

    const protectedRoutes = pathname.startsWith('/dashboard');
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/forgot-password');

    if (!session && protectedRoutes) {
        throw redirect(302, "/login");
    }
    if (session && isAuthPage) {
        throw redirect(302, "/dashboard");
    }

    return resolve(event);
};

export const handle = sequence(AutHandle, authorizationHandler);
