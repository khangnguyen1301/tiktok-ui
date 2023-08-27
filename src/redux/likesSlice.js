import { createSlice } from '@reduxjs/toolkit';

const likesSlice = createSlice({
    name: 'likes',
    initialState: {
        isLiked: false,
        syncLikes: false
    },
    reducers: {
        liked: (state) => {
            state.isLiked = true;
            state.syncLikes = true;
        },
        unliked: (state) => {
            state.isLiked = false;
            state.syncLikes = true;
        },
    },
});

export const { liked, unliked } = likesSlice.actions;

export default likesSlice.reducer;
