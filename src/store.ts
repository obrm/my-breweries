import { configureStore } from '@reduxjs/toolkit';

import breweryReducer from './features/breweries/brewerySlice';

export const store = configureStore({
  reducer: {
    brewery: breweryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
