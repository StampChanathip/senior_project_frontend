import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  excelData: [],
  currentData: {}
};

export const excelDataSlice = createSlice({
  name: "excelData",
  initialState,
  reducers: {
    setExcelData: (state, action) => {
      state.excelData = action.payload;
    },
    setCurrentData: (state, action) => {
      state.currentData = action.payload;
    },
  },
});

export const { excelData, currentData, setExcelData, setCurrentData } = excelDataSlice.actions;

export default excelDataSlice.reducer;
