import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlay: false,
  sliderValue: 0,
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
  },
});

export const { playClicked, setSliderValue } = timeSliderSlice.actions;

export default timeSliderSlice.reducer;
