import * as httpRequest from '~/utils/httpRequest';

export const getInfoUser = async (pathName) => {
    try {
        const res = await httpRequest.get(`users${pathName}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getInfoMe = async () => {
    try {
        const res = await httpRequest.get(`auth/me`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
