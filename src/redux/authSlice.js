import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
            isLogin: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            state.login.isLogin = true;
        },
        loginFailed: (state) => {
            state.login.isFetching = true;
            state.login.error = true;
        },
        logout: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
            state.login.isLogin = false;
        },
    },
});

export const { loginStart, loginSuccess, loginFailed, logout } = authSlice.actions;

export default authSlice.reducer;
