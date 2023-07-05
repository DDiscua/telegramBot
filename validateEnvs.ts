export const validateEnvs = (ENVS: NodeJS.ProcessEnv) => {
    const ENV = ENVS.ENV;
    const DATADOG_API_KEY = ENVS[`DATADOG_API_KEY_${ENV}`];
    const DATADOG_APP_KEY = ENVS[`DATADOG_APP_KEY_${ENV}`];

    if (!ENV) {
        throw new Error('ENV is required');
    }

    if (!ENVS.BOT_TOKEN) {
        throw new Error('BOT_TOKEN is required');
    }

    if (!ENVS.APPLICATION_NAME) {
        throw new Error('APPLICATION_NAME is required');
    }

    if (!DATADOG_API_KEY) {
        throw new Error('DATADOG_API_KEY is required');
    }

    if (!ENVS.MONGO_DB) {
        throw new Error('MONGO_DB is required');
    }

    if (!ENVS.MONGO_DB_USER) {
        throw new Error('MONGO_DB_USER is required');
    }

    if (!ENVS.MONGO_DB_USER) {
        throw new Error('MONGO_DB_USER is required');
    }

    if (!ENVS.MONGO_DB_PASSWORD) {
        throw new Error('MONGO_DB_PASSWORD is required');
    }

    if (!ENVS.MONGO_DB_NAME) {
        throw new Error('MONGO_DB_NAME is required');
    }

    if (!ENVS.MONGO_DB_HOST) {
        throw new Error('MONGO_DB_HOST is required');
    }

    if (!ENVS.OPEN_AI_URL) {
        throw new Error('OPEN_AI_URL is required');
    }

    if (!ENVS.OPEN_AI_TOKEN) {
        throw new Error('OPEN_AI_TOKEN is required');
    }
};
