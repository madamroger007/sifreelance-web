import { getProjectsByUserIdService, getRevenueBreakdownService, getTotalRevenueService } from "$lib/server/services/project/project-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth();
    if (!session?.user?.id) {
        return {
            title: "Dashboard",
            totalRevenue: 0,
            revenueBreakdown: []
        }
    }
    const getProjects = await getProjectsByUserIdService(session.user.id);
    const [totalRevenue, revenueBreakdown] = await Promise.all([
        getTotalRevenueService(session.user.id),
        getRevenueBreakdownService(session.user.id)
    ]);

    return {
        title: "Dashboard",
        totalRevenue,
        revenueBreakdown,
        projects: getProjects
    }
}