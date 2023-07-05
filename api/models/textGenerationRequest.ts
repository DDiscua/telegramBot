export interface TextGenerationRequest {
    model: string;
    prompt: string;
    max_tokens: number;
    temperature: number;
    top_p: number;
    n: number;
    stream: boolean;
    logprobs: null | number;
    stop: string;
}
