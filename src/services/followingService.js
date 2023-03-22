import * as httpRequest from '~/utils/httpRequest';

export const getVideoListFollowing = async ({ type = 'following', page }) => {
    try {
        const res = await httpRequest.get('videos', {
            params: {
                type,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
