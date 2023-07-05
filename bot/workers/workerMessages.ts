import { BotWorker } from '@grammyjs/runner';
import * as dotenv from 'dotenv';
dotenv.config();

//Env vars
const BOT_TOKEN = process.env.BOT_TOKEN || '';

// Create a new bot worker.
const bot = new BotWorker(BOT_TOKEN);
