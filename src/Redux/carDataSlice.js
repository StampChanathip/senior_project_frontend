import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carData: { 1: { detail: {}, position: [], link:[] } }
};

export const carDataSlice = createSlice({
  name: "carPosition",
  initialState,
  reducers: {
    setCarData: (state, action) => {
      state.carData[action.payload.carId] = {
        detail: action.payload.detail,
        position: action.payload.position,
        link: action.payload.link
      };
    },
    resetCarData: (state, action) => {
      Array.from(Array(20).keys()).forEach((i) => {
        state.carData[String(i + 1)] = { detail: {passedLink: []}, position: [], link:[] }
      })
    }
  },
});

export const { carData, setCarData, resetCarData } = carDataSlice.actions;

export default carDataSlice.reducer;
