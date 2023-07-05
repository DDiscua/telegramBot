import { LOGGER } from '../../logger';
import { openAiClient } from '../openAI';
import { ChatCompletion } from '../models';
import {
    FREQUENCY_PENALTY,
    MAX_TOKENS,
    PRESENCE_PENALTY,
    TEMERATURE,
    TOP_P,
} from '../../constants';

const modelName = 'text-davinci-003';

export const createCompletion = async (prompt: string): Promise<ChatCompletion | null | undefined> => {

    let retValue = {}
    try {
        const response = await openAiClient.createCompletion({
            model: modelName,
            prompt: prompt,
            temperature: TEMERATURE,
            max_tokens: MAX_TOKENS,
            top_p: TOP_P,
            frequency_penalty: FREQUENCY_PENALTY,
            presence_penalty: PRESENCE_PENALTY,
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            LOGGER.error(`[createCompletion][Error while creating completion]`, {
                metadata: err,
            });
            return null;
        });

        if (response === null) {
            return null;
        }

        return {
            id: response.id,
            object: response.object,
            created: response.created,
            choices: response.choices,
            usage: response.usage,
        };

    } catch (error) {
        LOGGER.error(`[createCompletion][Error while creating completion]`, {
            metadata: error,
        });
    }
};
