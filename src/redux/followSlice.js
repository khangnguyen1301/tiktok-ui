import { createSlice } from '@reduxjs/toolkit';

const followSlice = createSlice({
    name: 'follow',
    initialState: {
        isChangeFollow: false,
    },
    reducers: {
        changeFollow: (state) => {
            state.isChangeFollow = !state.isChangeFollow;
        },
    },
});

export const { changeFollow } = followSlice.actions;

export default followSlice.reducer;
