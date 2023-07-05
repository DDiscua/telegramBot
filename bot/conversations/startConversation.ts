import { BotContext, ConverstaionContext } from '../types';
import { LOGGER } from '../../logger';
import { addUser, getUserByTelegramId } from '../../mongodb/operations';


async function captcha(conversation: ConverstaionContext, ctx: BotContext) {
    if (ctx.from === undefined) return false;
    await ctx.reply(
        'Prove you are human! resolve the following multiplication <b> 7 * 8</b> ?'
    );
    const { message } = await conversation.waitFrom(ctx.from);
    return message?.text === '48';
}

const startConversation = async (
    conversation: ConverstaionContext,
    ctx: BotContext
) => {
    const ok = await captcha(conversation, ctx);

    if (!ok) {
        await ctx.conversation.exit();
        return;
    }

    const { user } = await ctx.getAuthor();

    if (!user.username) {
        LOGGER.info(
            `[startConversation][player does not have a username configured]`,
            { metadata: '' }
        );
        await ctx.reply('Please define an username for your account first', {
            reply_to_message_id: ctx?.msg?.message_id,
        });

        await ctx.conversation.exit();
        return;
    }

    //Find if user exists
    const userExists = await conversation.external(
        async () => await getUserByTelegramId(user.id)
    );

    if (userExists) {
        ctx.reply(`Welcome back ${userExists.firstName}!`);
        conversation._deactivate();
    } else {
        const createdUser = await conversation.external(async () =>
            addUser({
                telegramId: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                telegramUserName: user.username || '',
            })
        );

        if (createdUser) {
            ctx.reply(`Welcome ${createdUser.firstName}!`);
        } else {
            ctx.reply(`Something went wrong!`);
        }

        conversation._deactivate();
    }
};

export { startConversation };
