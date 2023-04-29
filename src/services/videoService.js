import * as httpRequest from '~/utils/httpRequest';

export const getVideo = async (id) => {
    try {
        const res = await httpRequest.get(`videos/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

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

export const deleteVideo = async (videoID) => {
    try {
        const res = await httpRequest.deleteMethod(`videos/${videoID}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
