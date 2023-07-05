import { run, distribute } from '@grammyjs/runner';
import path from 'path';
import { fileURLToPath } from 'url';
import { bot } from './bot';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runBot = () => {
    if (!bot.isInited()) {
        console.log('BOT NOT INITIATED');
        const pathToWorkers = `${__dirname}/workers`;
        //Distribute
        //  bot.use(distribute(pathToWorkers + '/workerMessages.ts'));

        run(bot);
    }
};

export { runBot };
