import mongoose, { Document, Schema } from 'mongoose';

export interface UserDoc extends Document {
    telegramUserName: string;
    telegramId: number;
    firstName: string;
    lastName?: string;
}

export const userSchema: Schema = new mongoose.Schema(
    {
        telegramUserName: { type: String, required: false },
        telegramId: { type: Number, unique: true, required: false },
        firstName: { type: String, required: true },
        lastName: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model<UserDoc>('User', userSchema);
