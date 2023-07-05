import { BotContext, ConverstaionContext } from '../types';
import { LOGGER } from '../../logger';

const options = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: 'Accept', callback_data: 'accept_challenge' },
                { text: 'Decline', callback_data: 'decline_challenge' },
            ],
        ],
    },
};

const imageConversation = async (
    conversation: ConverstaionContext,
    ctx: BotContext
) => {
    if (ctx.from === undefined) return false;

    //Find the user
    const { user } = await ctx.getAuthor();
    if (user.username) {
    } else {
        LOGGER.error(
            `[imageConversation][player does not have a username configured]`,
            { metadata: '' }
        );
        await ctx.reply('Please define an username for your account first', {
            reply_to_message_id: ctx?.msg?.message_id,
        });
        conversation._deactivate();
    }
};

export { imageConversation };
