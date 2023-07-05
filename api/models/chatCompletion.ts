import { CreateCompletionResponse, CreateCompletionResponseChoicesInner } from "openai";
export interface Message {
    role: string;
    content: string;
}

export interface Conversation {
    model: string;
    messages: Message[];
}

export interface Choice {
    index: number;
    text: string;
    finish_reason: string;
    logprobs: any;
}

export interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

export interface ChatCompletion {
    id: string;
    object: string;
    created: number;
    choices?: Choice[] | CreateCompletionResponseChoicesInner[];
    usage?: Usage;
}

export type ChatCompletionResponse = ChatCompletion | CreateCompletionResponse;
