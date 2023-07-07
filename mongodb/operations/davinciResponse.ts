import mongoose from 'mongoose';
import { LOGGER } from '../../logger';
import { DavinciResponseDoc, DavinciResponse } from '../schemas/davinciResponse';

export const addDavinciMessage = async ({
    chatId,
    author,
    authorId,
    text,
}: Pick<DavinciResponseDoc, "chatId" | "author" | "authorId" | "text">): Promise<DavinciResponseDoc | null> => {
    try {
        const davinciMessage = new DavinciResponse({
            chatId,
            author,
            authorId,
            text,
        });
        const newDavinciMessage = await davinciMessage.save();
        return newDavinciMessage;
    } catch (error: any) {
        LOGGER.error('[addMessage][error]', { metadata: { error } });
        return null;
    }
};
