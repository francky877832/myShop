import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './favourites/favouritesSlice';
import basketReducer from './baskets/basketsSlice';

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    basket: basketReducer,
  },
});
