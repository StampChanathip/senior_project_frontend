import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlay: false,
  sliderValue: 0,
  playSpeed: 1,
};

export const timeSliderSlice = createSlice({
  name: "timeSlider",
  initialState,
  reducers: {
    playClicked: (state) => {
      state.isPlay = !state.isPlay;
    },
    setSliderValue: (state, action) => {
      state.sliderValue = action.payload;
    },
    setPlaySpeed: (state, action) => {
      state.playSpeed = action.payload;
    },
  },
});

export const { playClicked, setSliderValue, setPlaySpeed, playSpeed } =
  timeSliderSlice.actions;

export default timeSliderSlice.reducer;
