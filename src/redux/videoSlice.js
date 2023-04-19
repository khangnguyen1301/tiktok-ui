import { createSlice } from '@reduxjs/toolkit';

const videoSlice = createSlice({
    name: 'video',
    initialState: {
        defaultVolume: 0.6,
        isMuted: true,
    },
    reducers: {
        adjustVolume: (state, action) => {
            state.defaultVolume = action.payload;
        },
        handleMuted: (state) => {
            state.isMuted = !state.isMuted;
        },
    },
});

export const { adjustVolume, handleMuted } = videoSlice.actions;

export default videoSlice.reducer;
