import * as httpRequest from '~/utils/httpRequest';

export const getComment = async ({ videoID }) => {
    try {
        const res = await httpRequest.get(`videos/${videoID}/comments`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const postComment = async ({ videoID, comment }) => {
    try {
        const res = await httpRequest.post(`videos/${videoID}/comments`, {
            comment: comment,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
