import * as httpRequest from '~/utils/httpRequest';

export const search = async (q, type = 'less', page = 1) => {
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                page,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
