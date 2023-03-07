import * as httpRequest from '~/utils/httpRequest';

export const getInfoUser = async (pathName) => {
    try {
        const res = await httpRequest.get(`users${pathName}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
