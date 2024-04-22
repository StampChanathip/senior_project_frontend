import { configureStore } from "@reduxjs/toolkit";
import preloaderReducer from "./preloaderSlice";
import excelDataReducer from "./excelDataSlice";
import passengerDetailReducer from "./passDetailSlice";
import carDataReducer from "./carDataSlice";
import linkDataReducer from "./linkDataSlice"

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import stationDataReducer from "./stationDetailSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, carDataReducer);
const persistedstationDataReducer = persistReducer(persistConfig, stationDataReducer);

export const store = configureStore({
  reducer: {
    preloader: preloaderReducer,
    excelData: excelDataReducer,
    passengerDetail: passengerDetailReducer,
    carData: persistedReducer,
    linkData: linkDataReducer,
    stationData: stationDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
