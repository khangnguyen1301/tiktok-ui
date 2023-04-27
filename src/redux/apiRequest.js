import * as userService from '~/services/userService';
import { loginFailed, loginStart, loginSuccess, registerStart, registerSuccess, registerFailed } from './authSlice';
import { uploadFailed, uploadStart, uploadSuccess } from '~/redux/videoSlice';
import * as upLoadService from '~/services/uploadService';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const result = await userService.userLogin(user);
        if (result?.response?.data?.status_code === 422) {
            throw result.response.data.errors.email[0];
        } else if (result?.response?.data?.status_code === 401) {
            // eslint-disable-next-line no-throw-literal
            throw 'Wrong password';
        } else {
            let now = new Date();
            now.setTime(now.getTime() + 3 * 24 * 60 * 60 * 1000);
            let expires = 'expires=' + now.toUTCString();
            document.cookie = 'token=' + result.meta.token + ';' + expires;
            dispatch(loginSuccess(result.data));
            navigate('/');
        }
    } catch (err) {
        dispatch(loginFailed(err));
    }
};

export const registerUser = async (user, dispatch) => {
    dispatch(registerStart());
    try {
        const result = await userService.userRegister(user);
        if (result.response.data.status_code === 422) {
            throw result.response.data.errors;
        } else {
            dispatch(registerSuccess(result.data));
        }
    } catch (err) {
        dispatch(registerFailed(err));
    }
};

export const updateUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const result = await userService.userUpdateInfo(user);
        console.log(result);
        dispatch(loginSuccess(result.data));
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
