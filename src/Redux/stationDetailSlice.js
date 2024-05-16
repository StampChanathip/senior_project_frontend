import { createSlice } from "@reduxjs/toolkit";

const stationPosition = [
  [100.52287826176608, 13.739723076847634],
  [100.52585894556694, 13.744213526676143],
  [100.52366371023128, 13.74479226226551],
  [100.52751555417184, 13.744178048029855],
];

const initialState = {
  isShowStation: false,
  stationDetail: { 1: [],2:[], 3:[], 4:[] },
  stationHistory: [],
};

export const stationDetailSlice = createSlice({
  name: "stationDetail",
  initialState,
  reducers: {
    setIsShowStation: (state, action) => {
      state.isShowPassenger = action.payload;
    },
    setStationDetail: (state, action) => {
      state.stationDetail[action.payload.stationId] = action.payload.detail;
    },
    setStationHistory: (state, action) => {
      const excelData = action.payload;
      const history = {1: []};
      [1,2,3,4].forEach((i) => {
        history[i] = excelData.filter((each) => {
            const statusCheck = each.properties.status === "charging" || each.properties.status === "nan";
            const positionCheck =
              stationPosition[i - 1][1] === each.geometry.coordinates[0][0];
            return statusCheck && positionCheck;
          });
      })
      state.stationHistory = history;
    },
    clearStationHistory: (state) => {
      state.stationHistory = { 1: [] };
    },
  },
});

export const {
  isShowStation,
  stationDetail,
  setIsShowStation,
  setStationDetail,
  stationHistory,
  setStationHistory,
  clearStationHistory,
} = stationDetailSlice.actions;

export default stationDetailSlice.reducer;
