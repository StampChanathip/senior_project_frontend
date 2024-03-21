import { configureStore } from "@reduxjs/toolkit";
import timeSliderReducer from "./timeSliderSlice";
import preloaderReducer from "./preloaderSlice";
import excelDataReducer from "./excelDataSlice";
import passengerDetailReducer from "./passDetailSlice";

export const store = configureStore({
  reducer: {
    timeSlider: timeSliderReducer,
    preloader: preloaderReducer,
    excelData: excelDataReducer,
    passengerDetail: passengerDetailReducer,
  },
});
