import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './favourites/favouritesSlice';

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
});
