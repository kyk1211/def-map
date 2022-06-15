import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import mapReducer from './mapSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    map: mapReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
