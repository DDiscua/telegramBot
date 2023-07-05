import axios from 'axios';
import { configEnvs } from '../../config';

const OPEN_AI_URL = process.env.OPEN_AI_URL || '';
const OPEN_AI_TOKEN = process.env.OPEN_AI_TOKEN || '';

const axiosClient = axios.create({
    baseURL: OPEN_AI_URL,
    headers: {
        'Content- Type': 'application/json',
        Authorization: `Bearer ${OPEN_AI_TOKEN}`,
    },
});

export { axiosClient };
