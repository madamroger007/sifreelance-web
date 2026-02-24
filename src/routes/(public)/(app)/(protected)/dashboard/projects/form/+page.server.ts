import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { generatePriceRecommendation } from "$lib/server/services/ai/ai-generated";
import { projectSchema, recommendationSchema, type FormValues } from "$lib/shared/validators/project.schema";
import { createProjectService, getProjectByIdService, updateProjectService } from "$lib/server/services/project/project-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    const projectId = url.searchParams.get("id");

    // Create mode - no project ID
    if (!projectId) {
        return {
            title: "Create Project",
            mode: "create" as const,
            project: null,
        };
    }

    const project = await getProjectByIdService(projectId);

    if (!project) {
        return {
            title: "Create Project",
            mode: "create" as const,
            project: null,
        };
    }

    return {
        title: "Edit Project",
        mode: "update" as const,
        project: {
            id: project.id,
            projectName: project.title,
            description: project.description ?? "",
            status: project.status,
            complexity: project.complexity,
            budget: project.budget?.toString() ?? "",
            price: project.price?.toString() ?? "",
            deadline: project.deadline?.toString() ?? "",
            clientName: project.clientName ?? "",
            clientEmail: project.clientEmail ?? "",
            projectType: project.type ?? "",
            currency: project.currency,
        },
    };
}

export const actions: Actions = {
    generate: async ({ request }) => {
        const formData = await request.formData();
        const values = Object.fromEntries(formData.entries());
        const parsed = projectSchema.safeParse(values);
        if (!parsed.success) {
            return fail(400, {
                error: "Please fill in all required fields before generating a price range.",
                values,
            });
        }
        const recommendation = await generatePriceRecommendation(parsed.data);
        return { values, recommendation };
    },
    apply: async ({ request }) => {
        const formData = await request.formData();
        const values = Object.fromEntries(formData.entries());
        const parsed = projectSchema.and(recommendationSchema).safeParse(values);
        if (!parsed.success) {
            return fail(400, {
                error: "Please generate a price range before applying the budget.",
                values: parsed.data,
            });
        }
        const { recommendedMin, recommendedMax } = parsed.data;
        const price = recommendedMin;
        return {
            values: {
                ...parsed.data,
                price: Math.round(price).toString(),
            },
            recommendation: {
                recommendedMin,
                recommendedMax,
                estimatedHours: parsed.data.estimatedHours,
                analysisSummary: parsed.data.analysisSummary,
                currency: parsed.data.currency,
                projectType: parsed.data.projectType,
                complexity: parsed.data.complexity,
                reasoning: [],
            },
        };
    },
    save: async ({ request, locals }) => {
        const session = await locals.auth();
        if (!session?.user?.id) {
            return fail(401, { error: "Session expired. Please log out and log back in." });
        }
        const formData = await request.formData();
        const values = Object.fromEntries(formData.entries());
        const parsed = projectSchema.safeParse(values);
        const projectId = values.id as string;
        if (!parsed.success) {
            return fail(400, {
                error: "Please complete the AI analysis before saving the project.",
                values: values,
            });
        }

        const ProjectInput = {
            title: parsed.data.projectName,
            description: parsed.data.description,
            status: parsed.data.status,
            complexity: parsed.data.complexity,
            budget: parsed.data.budget,
            clientName: parsed.data.clientName,
            clientEmail: parsed.data.clientEmail,
            deadline: parsed.data.deadline,
            userId: session.user.id,
            type: parsed.data.projectType,
            price: parsed.data.price,
            currency: parsed.data.currency,
        };

        // Update mode - update existing project
        if (projectId) {
            await updateProjectService(projectId, ProjectInput);
            return { saved: true, values, mode: "update" };
        }
        // Create mode - create new project
        await createProjectService(ProjectInput);
        return { saved: true, values, mode: "create" };
    },
};