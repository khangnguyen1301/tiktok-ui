import * as httpRequest from '~/utils/httpRequest';

export const likeVideo = async ({ videoID }) => {
    try {
        const res = await httpRequest.post(`videos/${videoID}/like`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const unLikeVideo = async ({ videoID }) => {
    try {
        const res = await httpRequest.post(`videos/${videoID}/unlike`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
