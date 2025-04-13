import { configureStore } from "@reduxjs/toolkit";
import favouriteSlice from "./favouritesSlice"; // Import your reducer

export const store = configureStore({
  reducer: {
    favouritelist: favouriteSlice, // Add your reducer to manage favourites
  },
});
export default store;