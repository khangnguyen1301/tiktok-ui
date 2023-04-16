import axios from 'axios';
import { useSelector } from 'react-redux';

// const Token = () => {
//     const token = useSelector((state) => state.auth.login?.currentUser?.meta?.token);
//     return token;
// };

// const token = Token();

const TOKEN =
    `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY4MTY3NjE5NCwiZXhwIjoxNjg0MjY4MTk0LCJuYmYiOjE2ODE2NzYxOTQsImp0aSI6IlF0NktlbzVuQkwyNHVhWEQiLCJzdWIiOjUyMDMsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.eaSQkyjMeXIQeDzQSkdfeCQkKzkCaUaZn4jdIEP7jW4` ??
    '';
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
