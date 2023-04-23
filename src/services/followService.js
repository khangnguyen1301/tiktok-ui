import * as httpRequest from '~/utils/httpRequest';

export const followUser = async ({ userID }) => {
    try {
        const res = await httpRequest.post(`users/${userID}/follow`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const unFollowUser = async ({ userID }) => {
    try {
        const res = await httpRequest.post(`users/${userID}/unfollow`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
