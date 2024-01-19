import { configureStore } from "@reduxjs/toolkit";
import timeSliderReducer from "./timeSliderSlice";
export const store = configureStore({
  reducer: {
    timeSlider: timeSliderReducer,
  },
});
