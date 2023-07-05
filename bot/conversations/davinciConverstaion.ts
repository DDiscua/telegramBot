import { BotContext, ConverstaionContext } from '../types';
import { LOGGER } from '../../logger';
import { addDavinciMessage, getUserByTelegramId } from '../../mongodb/operations';
import { createCompletion } from '../../api';

const davinciConverstaion = async (
    conversation: ConverstaionContext,
    ctx: BotContext
) => {

    //Find the user
    const { user } = await ctx.getAuthor();

    const existingUser = await getUserByTelegramId(user.id);

    if (!existingUser) {
        LOGGER.info(`[davinciConverstaion][user does not exist]`, {
            metadata: '',
        });
        await ctx.reply('Please register using /start command first!', {
            reply_to_message_id: ctx?.msg?.message_id,
        });
        await ctx.conversation.exit();
    }
    do {
        await ctx.reply('Please enter your prompt to davinci model, or /cancel to exit');

        const { message } = await conversation.wait();

        if (isCancel(message?.text || '')) {
            await ctx.reply('Leaving...');
            await ctx.conversation.exit();
            return;
        }

        const davinciResponse = await conversation.external(
            () => createCompletion(message?.text || '')
        );

        if (!davinciResponse) {
            await ctx.reply('Ops! something went wrong, maybe davinci is sleeping');
            await ctx.conversation.exit();
            return;
        }

        const davinciMessage = davinciResponse.choices?.[0]?.text || "";

        addDavinciMessage({
            chatId: ctx.chat?.id,
            authorId: existingUser?.telegramId,
            author: existingUser?.telegramUserName,
            text: davinciMessage,
        });

        ctx.reply(`${davinciMessage}`);
    } while (true);
    // await ctx.conversation.exit();
};


export const isCancel = (messsage: string) => {
    if (messsage === '/cancel') {
        return true;
    }
    return false;
}

export { davinciConverstaion };
