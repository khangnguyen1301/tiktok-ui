import * as userService from '~/services/userService';
import { loginFailed, loginStart, loginSuccess, registerStart, registerSuccess, registerFailed } from './authSlice';
import { uploadFailed, uploadStart, uploadSuccess } from '~/redux/videoSlice';
import * as upLoadService from '~/services/uploadService';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const result = await userService.userLogin(user);
        let now = new Date();
        now.setTime(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        let expires = 'expires=' + now.toUTCString();
        document.cookie = 'token=' + result.meta.token + ';' + expires;
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

export const handleUploadVideo = async (video, dispatch) => {
    dispatch(uploadStart());
    try {
        await upLoadService.upLoadVideo(video);
        dispatch(uploadSuccess());
    } catch (err) {
        dispatch(uploadFailed());
    }
};
