import { createSlice } from '@reduxjs/toolkit';

const followSlice = createSlice({
    name: 'follow',
    initialState: {
        stateFollow: false,
        isChangeFollow: false,
        synchronizedFollow: false,
    },
    reducers: {
        handleRequestFollow: (state) => {
            state.isChangeFollow = !state.isChangeFollow;
            state.stateFollow = true;
            state.synchronizedFollow = true;
        },
        handleRequestUnFollow: (state) => {
            state.isChangeFollow = !state.isChangeFollow;
            state.stateFollow = false;
            state.synchronizedFollow = true;
        },
        handleResetStateFollow: (state) => {
            state.synchronizedFollow = false;
        },
    },
});

export const { handleRequestFollow, handleRequestUnFollow, handleResetStateFollow } = followSlice.actions;

export default followSlice.reducer;
