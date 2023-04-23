import * as httpRequest from '~/utils/httpRequest';

export const upLoadVideo = async (requestOptions) => {
    try {
        const res = await httpRequest.post(`videos`, requestOptions);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
