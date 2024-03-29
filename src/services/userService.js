import * as httpRequest from '~/utils/httpRequest';

export const getSuggested = async ({ page, perPage }) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                page,
                per_page: perPage,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getFollowingList = async ({ page }) => {
    try {
        const res = await httpRequest.get('me/followings', {
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const userLogin = async ({ email, password }) => {
    try {
        const res = await httpRequest.post('auth/login', {
            email,
            password,
        });
        return res;
    } catch (error) {
        return error;
    }
};

export const userRegister = async ({ email, password }) => {
    try {
        const res = await httpRequest.post('auth/register', {
            type: 'email',
            email,
            password,
        });
        return res;
    } catch (error) {
        return error;
    }
};

export const userUpdateInfo = async (formData) => {
    try {
        const res = await httpRequest.post('auth/me', formData, {
            params: {
                _method: 'PATCH',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
