import * as dotenv from 'dotenv';
dotenv.config();

const ENV = process.env.ENV || 'DEV';

export const getEnv = () => {
    return ENV;
};

export const getLogLevel = (): string => {
    if (ENV === 'DEV') {
        return 'debug';
    }

    if (ENV === 'PROD') {
        return 'info';
    }

    if (ENV === 'TEST') {
        return 'error';
    }

    if (ENV === 'STAGE') {
        return 'warn';
    }

    return process.env.LOG_LEVEL || 'info';
};

export const getDataDogAppKey = (): string => {
    return process.env[`DATADOG_APP_KEY_${ENV}`] || '';
};

export const getDataDogApiKey = (): string => {
    return process.env[`DATADOG_API_KEY_${ENV}`] || '';
};

export const getApplicationName = (): string => {
    return `${process.env.APPLICATION_NAME || ''}_${ENV}`;
};

export const getLogHostName = (): string => {
    if (ENV === 'PROD' || ENV === 'QA') {
        return `cloud_${ENV}`;
    }

    if (ENV === 'DEV') {
        return `localhost_${ENV}`;
    }

    return 'localhost';
};

export const getEnableLogs = (): boolean => {
    if (process.env.ENABLE_LOGS === 'true') {
        return true;
    }
    return false;
}
