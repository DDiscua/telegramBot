import mongoose from 'mongoose';
import { LOGGER } from '../../logger';
import { MessagesDoc, Message } from '../schemas/messages';

export const addMessage = async ({
    chatId,
    author,
    authorId,
    text,
    status,
    messageId,
}: MessagesDoc): Promise<MessagesDoc | null> => {
    try {
        const degaMessage = new Message({
            chatId,
            author,
            authorId,
            text,
            status,
            messageId,
        });
        const newMessage = await degaMessage.save();
        return newMessage;
    } catch (error: any) {
        LOGGER.error('[addMessage][error]', { metadata: { error } });
        return null;
    }
};

export const updateMessage = async (
    id: mongoose.Types.ObjectId,
    updates: Partial<MessagesDoc>
): Promise<MessagesDoc | null> => {
    try {
        const existing = await getMessageById(id);
        if (!existing) {
            return null;
        }
        Object.assign(existing, updates);
        const updated = await existing.save();
        return updated;
    } catch (error: any) {
        LOGGER.error('[updateMessage][error]', { metadata: { error } });
        return null;
    }
};

export const getMessageById = async (
    id: mongoose.Types.ObjectId
): Promise<MessagesDoc | null> => {
    try {
        const result = await Message.findOne({ id }).exec();
        return result;
    } catch (error: any) {
        LOGGER.error('[getMessageById][error]', { metadata: { error } });
        return null;
    }
};
