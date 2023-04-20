import { createSlice } from '@reduxjs/toolkit';

const videoSlice = createSlice({
    name: 'video',
    initialState: {
        defaultVolume: 0.6,
        isMuted: true,
        isUploadFetching: false,
        isUploaded: false,
        isUploadError: false,
        upLoadMessage: '',
        searchQuery: '',
        isSearching: false,
    },
    reducers: {
        adjustVolume: (state, action) => {
            state.defaultVolume = action.payload;
        },
        handleMuted: (state, action) => {
            state.isMuted = action.payload;
        },
        uploadStart: (state) => {
            state.isUploadFetching = true;
            state.isUploadError = false;
            state.upLoadMessage = '';
            state.isUploaded = false;
        },
        uploadSuccess: (state) => {
            state.isUploadFetching = false;
            state.isUploadError = false;
            state.isUploaded = true;
            state.upLoadMessage = 'Upload Video Success';
        },
        uploadFailed: (state, action) => {
            state.isUploadFetching = false;
            state.isUploadError = true;
            state.isUploaded = false;
            state.upLoadMessage = action.payload;
        },
        resetUploadState: (state) => {
            state.isUploadFetching = false;
            state.isUploadError = false;
            state.upLoadMessage = '';
            state.isUploaded = false;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        resetSearching: (state) => {
            state.isSearching = !state.isSearching;
        },
    },
});

export const {
    adjustVolume,
    handleMuted,
    uploadStart,
    uploadSuccess,
    uploadFailed,
    resetUploadState,
    setSearchQuery,
    resetSearching,
} = videoSlice.actions;

export default videoSlice.reducer;
