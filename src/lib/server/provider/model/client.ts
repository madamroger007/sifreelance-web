import OpenAI from "openai";
type CLientModelAIOptions = {
    url: string;
    apiKey: string;
    promptOverride: string;
    payload: ClientModelAIPayload;
};
type ClientModelAIPayload = {
    request: {
        model: string;
        message: string;
    };
};
export async function clientModelAI({ url, apiKey, promptOverride, payload }: CLientModelAIOptions) {
    try {
        const client = await new OpenAI({
            baseURL: url,
            apiKey: apiKey,
        });
        const completion = await client.chat.completions.create({
            model: payload.request.model,
            messages: [
                { role: 'system', content: promptOverride },
                { role: 'user', content: payload.request.message },
            ],
            temperature: 0.7,
        });
        return completion.choices[0]?.message?.content;
    } catch (error) {
        throw new Error(`AI request failed: ${error}`);
    }
}