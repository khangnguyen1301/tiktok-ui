import * as httpRequest from '~/utils/httpRequest';

export const getVideoListForYou = async ({ type = 'for-you', page }) => {
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
