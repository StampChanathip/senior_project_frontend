import { configureStore } from "@reduxjs/toolkit";
import timeSliderReducer from "./timeSliderSlice";
import preloaderReducer from "./preloaderSlice";
import excelDataReducer from "./excelDataSlice";

export const store = configureStore({
  reducer: {
    timeSlider: timeSliderReducer,
    preloader: preloaderReducer,
    excelData: excelDataReducer,
  },
});
