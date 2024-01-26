import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const preloaderSlice = createSlice({
  name: "preloader",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { isLoading, setLoading } = preloaderSlice.actions;

export default preloaderSlice.reducer;
