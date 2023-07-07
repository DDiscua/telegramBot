import { createLogger, format, transports } from 'winston';
import axios from 'axios';
import Transport from 'winston-transport';
import {
    getDataDogApiKey,
    getApplicationName,
    getLogHostName,
    getEnv,
    getEnableLogs,
} from './getEnvConfig';

const DATADOG_API_KEY = getDataDogApiKey();
const APPLICATION_NAME = getApplicationName();
const LOG_HOST_NAME = getLogHostName();
const ENV = getEnv();
const ENABLE_LOGS = getEnableLogs();
const PATH = `/api/v2/logs?dd-api-key=${DATADOG_API_KEY}&ddsource=nodejs&service=${APPLICATION_NAME}`;

const httpTransportOptions = {
    host: 'https://http-intake.logs.datadoghq.com',
    path: PATH,
    ssl: true,
    hostname: LOG_HOST_NAME,
    service: APPLICATION_NAME,
    ddsource: 'nodejs',
    ddtags: `env:${ENV}`,
};

const { combine, timestamp, json, errors } = format;
const errorsFormat = errors({ stack: true });

const datadogTransporter = async (payload: any) => {
    if (ENABLE_LOGS === false) {
        return;
    }

    const { level, message, timestamp, metadata, sendLog } = payload;
    const messageDate = `[telegram-bot]${message}[${new Date().toISOString()}]`;

    if (sendLog || level === 'error' || level === 'warn') {
        const data = [
            {
                level: level,
                message: messageDate,
                service: httpTransportOptions.service,
                metadata: metadata,
                ddsource: httpTransportOptions.ddsource,
                ddtags: httpTransportOptions.ddtags,
                timestamp: timestamp,
            },
        ];

        return axios
            .post(
                `${httpTransportOptions.host}${httpTransportOptions.path}`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                console.log('Response on transport success', response);
            })
            .catch((error) => {
                console.log('Error on transport', error);
            });
    }
};

class CustomTransport extends Transport {
    log(payload: any, cb: Function) {
        //Call datadog messages
        datadogTransporter(payload);
        cb(null);
    }
}

const logger = createLogger({
    level: 'info',
    exitOnError: false,
    format: json(),
    transports: [
        new transports.Console({
            format: combine(timestamp(), json(), errorsFormat),
        }),
        new CustomTransport({
            format: combine(timestamp(), json(), errorsFormat),
        }),
    ],
});

export { logger };
