import { configureStore } from '@reduxjs/toolkit';
import bcfSlice from './bcfSlice';

export const store = configureStore({
    reducer: {
        bcf: bcfSlice,
    },
});

// @ts-ignore
if (window.Cypress) window['store'] = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
