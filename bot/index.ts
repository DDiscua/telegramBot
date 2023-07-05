import { run } from '@grammyjs/runner';
import { bot } from './bot';

const runBot = () => {
    if (!bot.isInited()) {
        console.log('BOT NOT INITIATED');
        run(bot);
    }
};

export { runBot };
