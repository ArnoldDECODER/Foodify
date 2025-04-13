import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouriteItems: localStorage.getItem("favouriteItems")
    ? JSON.parse(localStorage.getItem("favouriteItems"))
    : [],
};

const favouriteSlice = createSlice({
  name: "favouritelist",
  initialState,
  reducers: {
    addTofavouritelists: (state, action) => {
      const exists = state.favouriteItems.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.favouriteItems.push(action.payload);
        localStorage.setItem("favouriteItems", JSON.stringify(state.favouriteItems));
      }
    },
    removeFavouriteItem: (state, action) => {
      state.favouriteItems = state.favouriteItems.filter((item) => item.id !== action.payload);
      localStorage.setItem("favouriteItems", JSON.stringify(state.favouriteItems));
    },
    clearAllFavouritelist: (state) => {
      state.favouriteItems = [];
      localStorage.removeItem("favouriteItems");
    },
  },
});

export const { addTofavouritelists, removeFavouriteItem, clearAllFavouritelist } = favouriteSlice.actions;
export default favouriteSlice.reducer;