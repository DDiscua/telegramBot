import mongoose, { Document, Schema } from 'mongoose';

enum MESSAGES_STATUS {
    NEW,
    READED,
    INGORED,
    REPLIED,
}
export interface MessagesDoc extends Document {
    chatId: number;
    author: string;
    authorId: number;
    text: string;
    status: MESSAGES_STATUS;
    messageId: number;
}

const messagesSchema: Schema = new mongoose.Schema(
    {
        chatId: { type: Number, required: true },
        author: { type: String, required: true },
        authorId: { type: Number, required: true },
        text: { type: String, required: true },
        status: { type: String, required: false, default: MESSAGES_STATUS.NEW },
        messageId: { type: Number, required: false },
    },
    { timestamps: true }
);

export const Message = mongoose.model<MessagesDoc>('Messages', messagesSchema);
