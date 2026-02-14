
import { z } from "zod";
const trimmedString = (max: number) => z.string().trim().min(1).max(max);

const budgetSchema = z.preprocess(
    (value) => {
        if (value === null || value === undefined || value === "") return undefined;
        if (typeof value === "string") {
            const cleaned = value.replace(/[^\d.]/g, "");
            return cleaned === "" ? undefined : cleaned;
        }
        return value;
    },
    z.coerce.number().nonnegative().optional(),
);

export const projectSchema = z.object({
    projectName: trimmedString(120),
    clientName: trimmedString(120),
    clientEmail: trimmedString(120),
    projectType: trimmedString(50),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED", "ON_HOLD"]),
    budget: budgetSchema,
    description: trimmedString(2000),
    complexity: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
    price: budgetSchema,
    deadline: z.string(),
    currency: z.string().length(3),
});

export const recommendationSchema = z.object({
    recommendedMin: z.coerce.number().positive(),
    recommendedMax: z.coerce.number().positive(),
    estimatedHours: z.coerce.number().nonnegative(),
    analysisSummary: trimmedString(500),
}).refine((data) => data.recommendedMax >= data.recommendedMin, {
    message: "recommendedMax must be greater than or equal to recommendedMin",
    path: ["recommendedMax"],
});

export type FormValues = Record<string, string>;
export type ProjectFormSchema = z.infer<typeof projectSchema>;
export type RecommendationSchema = z.infer<typeof recommendationSchema>;
