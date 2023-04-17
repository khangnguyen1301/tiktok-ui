import * as userService from '~/services/userService';
import { loginFailed, loginStart, loginSuccess, registerStart, registerSuccess, registerFailed } from './authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const result = await userService.userLogin(user);
        let now = new Date();
        now.setMonth(now.getMonth() + 1);
        document.cookie = 'token=' + result.meta.token + ';';
        document.cookie = 'expires=' + now.toUTCString() + ';';
        dispatch(loginSuccess(result.data));
        navigate('/');
    } catch (e) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch) => {
    dispatch(registerStart());
    try {
        await userService.userRegister(user);
        dispatch(registerSuccess());
    } catch (e) {
        dispatch(registerFailed());
    }
};

export const updateUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const result = await userService.userUpdateInfo(user);
        dispatch(loginSuccess(result));
        navigate(`/@${result.data?.nickname}`);
    } catch (e) {
        dispatch(loginFailed());
    }
};
