import { configureStore } from '@reduxjs/toolkit';
import issuesSlice from '../slices/issuesSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    issues: issuesSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
