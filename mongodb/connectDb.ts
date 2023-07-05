import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { LOGGER } from '../logger';

dotenv.config();

const DB = process.env.MONGO_DB || 'mongodb://';
const USER = process.env.MONGO_DB_USER || '';
const PASSWORD = encodeURIComponent(process.env.MONGO_DB_PASSWORD || '');
const DB_NAME = process.env.MONGO_DB_NAME || '';
const HOST = process.env.MONGO_DB_HOST || 'localhost';

const dbUrl = `${DB}${USER}:${PASSWORD}@${HOST}/${DB_NAME}`;

const connectDb = async () => {
    try {
        mongoose.set('strictQuery', false);
        const mongoDbConnection = await mongoose.connect(dbUrl, {
            retryReads: true,
            retryWrites: true,
        });
        if (mongoDbConnection.connection.readyState === 1) {
            LOGGER.info(`[connectDb][DB connected succesfully]`, {
                metadata: '',
                sendLog: true,
            });
        } else {
            LOGGER.error(`[connectDb][DB connection failed]`, { metadata: '' });
        }
    } catch (error: any) {
        // setTimeout(connectDb, 5000);
        LOGGER.error(`[connectDb][DB connection failed]`, {
            metadata: { error: error, stack: error.stack.toString() },
        });
    }
};

export { connectDb };
