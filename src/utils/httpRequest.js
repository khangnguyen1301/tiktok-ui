import axios from 'axios';

const TOKEN = `Bearer ${JSON.parse(localStorage.getItem('user')).data}`;
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
