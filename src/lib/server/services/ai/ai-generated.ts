import { clientModelAI } from '$lib/server/provider/model/client';
import { buildPricingSystemPrompt, buildUserPrompt } from '$lib/server/services/ai/prompt-agent';
import type { ProjectFormSchema } from '$lib/shared/validators/project.schema';
import { env } from '$env/dynamic/private';
import { NotFoundError } from '$lib/shared/httpresponse/notfound';
export type ComplexityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type PriceRecommendation = {
    recommendedMin: number;
    recommendedMax: number;
    currency: string;
    complexity: ComplexityLevel;
    estimatedHours: number;
    analysisSummary: string;
    reasoning: string[];
    marketTier: string;
    confidenceScore: number;
};

export async function generatePriceRecommendation(
    input: ProjectFormSchema
): Promise<PriceRecommendation> {
    const systemPrompt = buildPricingSystemPrompt({
        currency: input.currency,
        complexity: input.complexity,
        description: input.description,
        deadline: input.deadline?.toString() ?? '0',
        projectName: input.projectName,
        projectType: input.projectType,
    });

    const userPrompt = buildUserPrompt(input);
    try {
        const response = await clientModelAI({
            url: env.GEMINI_BASE_URL,
            apiKey: env.GEMINI_API_KEY,
            promptOverride: systemPrompt,
            payload: {
                request: {
                    model: env.GEMINI_MODEL,
                    message: userPrompt,
                },
            },
        });

        const content = response?.trim();
        if (!content) {
            throw new NotFoundError('AI returned empty response: ');
        }
        const parsed = parseJsonResponse(content);
        return normalizeRecommendation(parsed, input);
    } catch (error) {
        console.error('Error processing AI response:', error);
        throw new Error('Failed to generate price recommendation. Please try again later.');
    }
}

function parseJsonResponse(content: string): unknown {
    try {
        return JSON.parse(content);
    } catch {
        const match = content.match(/\{[\s\S]*\}/);
        if (!match) {
            throw new NotFoundError('AI response did not contain valid JSON');
        }
        return JSON.parse(match[0]);
    }
}

function normalizeRecommendation(
    raw: unknown,
    input: ProjectFormSchema
): PriceRecommendation {
    const data = raw as Partial<PriceRecommendation>;
    const recommendedMin = toNumber(data.recommendedMin);
    const recommendedMax = toNumber(data.recommendedMax);
    const estimatedHours = Math.max(0, Math.round(toNumber(data.estimatedHours)));

    return {
        recommendedMin: Math.min(recommendedMin, recommendedMax),
        recommendedMax: Math.max(recommendedMin, recommendedMax),
        currency: input.currency,
        complexity: input.complexity,
        estimatedHours,
        analysisSummary: data.analysisSummary?.trim() || 'Pricing estimate based on provided scope and complexity.',
        confidenceScore: toNumber(data.confidenceScore),
        marketTier: data.marketTier || '',
        reasoning: Array.isArray(data.reasoning) && data.reasoning.length > 0
            ? data.reasoning
            : [`Base ${input.projectType} range for ${input.complexity.toLowerCase()} complexity.`],
    };
}

function toNumber(value: unknown): number {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }
    if (typeof value === 'string') {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : 0;
    }
    return 0;
}
