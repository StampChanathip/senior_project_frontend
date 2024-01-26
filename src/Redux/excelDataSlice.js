import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  excelData: [],
};

export const excelDataSlice = createSlice({
  name: "excelData",
  initialState,
  reducers: {
    setExcelData: (state, action) => {
      state.excelData = action.payload;
    },
  },
});

export const { excelData, setExcelData } = excelDataSlice.actions;

export default excelDataSlice.reducer;
