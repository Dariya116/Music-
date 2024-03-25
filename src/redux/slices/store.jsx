import { configureStore } from '@reduxjs/toolkit';
import song from './song';
import { favoritesApi } from '../favoritesAPI';
import { registrationApi } from '../registrationAPI';
import { categoryApi } from './categoryAPI';

export const store = configureStore({
  reducer: {
    song,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(favoritesApi.middleware)
      .concat(registrationApi.middleware)
      .concat(categoryApi.middleware),
});
