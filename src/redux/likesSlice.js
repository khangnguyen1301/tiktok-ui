import { createSlice } from '@reduxjs/toolkit';

const likesSlice = createSlice({
    name: 'likes',
    initialState: {
        isLiked: false,
    },
    reducers: {
        liked: (state) => {
            state.isLiked = true;
        },
        unliked: (state) => {
            state.isLiked = false;
        },
    },
});

export const { liked, unliked } = likesSlice.actions;

export default likesSlice.reducer;
