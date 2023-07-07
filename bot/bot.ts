import { Bot, GrammyError, HttpError, session } from 'grammy';
import { apiThrottler } from '@grammyjs/transformer-throttler';
import { limit } from '@grammyjs/ratelimiter';
import { hydrateReply } from '@grammyjs/parse-mode';
import type { ParseModeFlavor } from '@grammyjs/parse-mode';
import { globalConfig, groupConfig, outConfig } from './limitsConfig';
import { BotContext } from './types';
import { COMMANDS } from './commands';
import * as dotenv from 'dotenv';
import {
    davinciConverstaion,
    startConversation,
} from './conversations';
import { conversations, createConversation } from '@grammyjs/conversations';
import { LOGGER } from '../logger';
dotenv.config();

//Env vars
const BOT_TOKEN = process.env.BOT_TOKEN || '';

//BOT CONFIG
const bot = new Bot<ParseModeFlavor<BotContext>>(BOT_TOKEN);
const throttler = apiThrottler({
    global: globalConfig,
    group: groupConfig,
    out: outConfig,
});

bot.api.setMyCommands(COMMANDS);
bot.use(hydrateReply);
bot.api.config.use(throttler);
//bot.api.config.use(parseMode('')); // Sets default parse_mode for ctx.reply

bot.use(
    session({
        initial() {
            // return empty object for now
            return {};
        },
    })
);

bot.use(
    limit({
        // Allow only 3 messages to be handled every 2 seconds.
        timeFrame: 2000,
        limit: 3,

        // This is called when the limit is exceeded.
        onLimitExceeded: async (ctx) => {
            await ctx.reply('Please refrain from sending too many requests!');
        },

        // Note that the key should be a number in string format such as "123456789".
        keyGenerator: (ctx) => {
            return ctx.from?.id.toString();
        },
    })
);

//Inject conversations
bot.use(conversations());
bot.use(createConversation(startConversation));
bot.use(createConversation(davinciConverstaion));

// LOGIC

//START COMMAND
bot.command('start', async (ctx) => {
    await ctx.conversation.enter('startConversation');
});

//HELP COMMAND
bot.command('help', async (ctx) => {
    ctx.reply('Help message');
});


//DAVINCI COMMAND
bot.command('davinci', async (ctx) => {
    await ctx.conversation.enter('davinciConverstaion');
});

// Always exit any conversation upon /cancel
bot.command("cancel", async (ctx) => {
    await ctx.conversation.exit();
    await ctx.reply("Leaving...");
});

//CRASH HANDLER
bot.catch((err) => {
    const ctx = err.ctx;
    LOGGER.error(
        `[bot-catch][Error while handling update ${ctx.update.update_id}]`,
        { metadata: err.error }
    );
    const e = err.error;

    if (e instanceof GrammyError) {
        LOGGER.error(`[bot-catch][Error in request ${ctx.update.update_id}]`, {
            metadata: e.message,
            stack: e.stack,
        });
    } else if (e instanceof HttpError) {
        LOGGER.error(`[bot-catch][Error in request ${ctx.update.update_id}]`, {
            metadata: e.error,
            stack: e.stack,
        });
    } else {
        LOGGER.error(`[bot-catch][Error in request ${ctx.update.update_id}]`, {
            metadata: e,
        });
    }
});

export { bot };
