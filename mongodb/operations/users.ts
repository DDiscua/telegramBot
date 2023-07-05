import mongoose, { ObjectId } from 'mongoose';
import { UserDoc, User } from '../schemas/user';
import { LOGGER } from '../../logger';

export const addUser = async ({
    telegramUserName,
    telegramId,
    firstName,
    lastName,
}: Pick<
    UserDoc,
    'telegramUserName' | 'telegramId' | 'firstName' | 'lastName'
>): Promise<UserDoc | null> => {
    try {
        const user = await getUserByTelegramId(telegramId);
        if (user) {
            return null;
        }

        const newUser = new User({
            telegramUserName,
            telegramId,
            firstName,
            lastName,
        });

        const saveduser = await newUser.save();

        if (saveduser?.id) {
            LOGGER.info('[addUser][success]', { metadata: {} });
        } else {
            LOGGER.error('[addUser][error]', {
                metadata: { error: 'User not saved' },
            });
        }

        return saveduser;
    } catch (error: any) {
        LOGGER.error('[addUser][error]', {
            metadata: { error: error, stack: error.stack?.toString() },
        });
        return null;
    }
};

export const getUserById = async (
    id: mongoose.Types.ObjectId
): Promise<UserDoc | null> => {
    try {
        const user = await User.findOne({ id });
        return user;
    } catch (error: any) {
        LOGGER.error('[getUserById][error]', {
            metadata: { error: error, stack: error.stack.toString() },
        });
        return null;
    }
};

export const getUserByTelegramId = async (
    id: number
): Promise<UserDoc | null> => {
    try {
        const user = await User.findOne({ telegramId: id });
        return user;
    } catch (error: any) {
        LOGGER.error('[getUserByTelegramId][error]', {
            metadata: { error: error, stack: error.stack.toString() },
        });
        return null;
    }
};

export const getUserByTelegramUser = async (
    telegramUserName: string
): Promise<UserDoc | null> => {
    const regexUser = new RegExp(`^${telegramUserName}$`, 'i');

    try {
        const user: UserDoc | null = await User.findOne({
            telegramUser: { $regex: regexUser },
        })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                LOGGER.error(`[getUserByTelegramUser][${err.message}]`, {
                    metadata: { error: err, stack: err.stack.toString() },
                });
                return null;
            });

        return user;
    } catch (error: any) {
        LOGGER.error('[getUserByTelegramUser][error]', {
            metadata: { error: error, stack: error.stack.toString() },
        });
        return null;
    }
};

export const updateUserById = async (
    id: mongoose.Types.ObjectId,
    update: Partial<UserDoc>
): Promise<UserDoc | null> => {
    try {
        const user = await getUserById(id);
        if (user) {
            Object.assign(user, update);
            await user.save();
            return user;
        }
        return null;
    } catch (error: any) {
        LOGGER.error('[updateUserById][error]', {
            metadata: { error: error, stack: error.stack.toString() },
        });
        return null;
    }
};

export const updateUserByTelegramId = async (
    telegramId: number,
    update: Partial<UserDoc>
): Promise<UserDoc | null> => {
    try {
        const user = await getUserByTelegramId(telegramId);
        if (user) {
            Object.assign(user, update);
            await user.save();
            return user;
        }
        return null;
    } catch (error: any) {
        LOGGER.error('[updateUserByTelegramId][error]', {
            metadata: { error: error, stack: error.stack.toString() },
        });
        return null;
    }
};
