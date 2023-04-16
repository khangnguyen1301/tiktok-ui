import * as userService from '~/services/userService';
import { loginFailed, loginStart, loginSuccess } from './authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const result = await userService.userLogin(user);
        dispatch(loginSuccess(result));
        navigate('/');
    } catch (e) {
        dispatch(loginFailed());
    }
};

export const updateUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const result = await userService.userUpdateInfo(user);
        console.log(result);
        dispatch(loginSuccess(result));
        navigate(`/@${result.data?.nickname}`);
    } catch (e) {
        dispatch(loginFailed());
    }
};
