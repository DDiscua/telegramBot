import { Configuration, OpenAIApi } from 'openai';
import { configEnvs } from '../../config';

const OPEN_AI_TOKEN = process.env.OPEN_AI_TOKEN || '';

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_TOKEN,
});

const openAiClient = new OpenAIApi(configuration);

export { openAiClient };
