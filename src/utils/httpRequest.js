import axios from 'axios';

const rawToken = document.cookie.split('token=')[1];

const TOKEN = `Bearer ${rawToken || process.env.FAKE_TOKEN_AUTH}`;
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

export const deleteMethod = async (path, options = {}, params = {}) => {
    const response = await httpRequest.delete(path, options, params);
    return response.data;
};

export default httpRequest;
