import mongoose, { Document, Schema } from 'mongoose';

export interface DavinciResponseDoc extends Document {
    chatId?: number;
    author?: string;
    authorId?: number;
    text: string;
}

const davinciResponseSchema: Schema = new mongoose.Schema(
    {
        chatId: { type: Number, required: true },
        author: { type: String, required: true },
        authorId: { type: Number, required: true },
        text: { type: String, required: true },
    },
    { timestamps: true }
);

export const DavinciResponse = mongoose.model<DavinciResponseDoc>('DavinciResponse', davinciResponseSchema);
