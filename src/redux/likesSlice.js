import { createSlice } from '@reduxjs/toolkit';

const likesSlice = createSlice({
    name: 'likes',
    initialState: {
        isLiked: false,
        syncLikes: false,
        currentVideoId: null,
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
        handleCurrentVideoId: (state,action) =>{
            state.currentVideoId = action.payload
        }
    },
});

export const { liked, unliked, handleCurrentVideoId } = likesSlice.actions;

export default likesSlice.reducer;
