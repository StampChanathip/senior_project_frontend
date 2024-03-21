import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowPassenger: false,
  passengerDetail: { carId: 0, detail: [] },
};

export const passengerDetailSlice = createSlice({
  name: "passengerDetail",
  initialState,
  reducers: {
    setIsShowPassenger: (state, action) => {
      state.isShowPassenger = action.payload;
    },
    setPassengerDetail: (state, action) => {
      state.passengerDetail = action.payload;
    },
  },
});

export const {
  isShowPassenger,
  passengerDetail,
  setIsShowPassenger,
  setPassengerDetail,
} = passengerDetailSlice.actions;

export default passengerDetailSlice.reducer;
