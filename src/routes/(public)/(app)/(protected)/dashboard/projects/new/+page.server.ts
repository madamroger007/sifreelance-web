import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { generatePriceRecommendation } from "$lib/server/services/ai/ai-generated";
import { projectSchema, recommendationSchema, type FormValues } from "$lib/shared/validators/project.schema";
import { createProjectService } from "$lib/server/services/project/project-service";

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
            tipe: parsed.data.projectType,
            price: parsed.data.price,
        };
        await createProjectService(ProjectInput)
        return { saved: true, values };
    },
};