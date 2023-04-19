import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import likesReducer from './likesSlice';
import videoReducer from './videoSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ auth: authReducer, like: likesReducer, video: videoReducer });
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['video'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
