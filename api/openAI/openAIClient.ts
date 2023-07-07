import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

const OPEN_AI_TOKEN = process.env.OPEN_AI_TOKEN || '';

const configuration = new Configuration({
    apiKey: OPEN_AI_TOKEN,
});

const openAiClient = new OpenAIApi(configuration);

export { openAiClient };
