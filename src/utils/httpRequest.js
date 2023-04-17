import axios from 'axios';
import { FAKE_TOKEN } from '~/constants/constants';

const rawToken = document.cookie.split(';')[0].slice(6);

const TOKEN = `Bearer ${rawToken || FAKE_TOKEN}`;
axios.defaults.headers.common['Authorization'] = TOKEN;

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, options = {}, params = {}) => {
    const response = await httpRequest.post(path, options, params);
    return response.data;
};

export default httpRequest;
