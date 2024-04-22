import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  linkData: { 1: { link: [] } },
  permaLinkData: [],
  allLinkData: [],
};

export const linkDataSlice = createSlice({
  name: "linkData",
  initialState,
  reducers: {
    setLinkData: (state, action) => {
      state.linkData[action.payload.carId] = {
        link: action.payload.link,
      };
    },
    setPermaLinkData: (state, action) => {
      state.permaLinkData = action.payload
    },
    setAllLinkData: (state, action) => {
      const excelData = action.payload;
      const allCoor = []
      const linkTimeData = excelData.map((each, idx, arr) => {
        if(arr[idx - 1]){
          allCoor.push(each.properties.passedLink, arr[idx - 1].geometry.coordinates)
          return {
            properties: { time: each.properties.time },
            coordinates: [...allCoor],
          };
        } else {
          return {
            properties: { time: each.properties.time },
            coordinates: [],
          };
        }
        
      });
      state.allLinkData = linkTimeData
    },
  },
});

export const { linkData, permaLinkData, allLinkData, setLinkData, setPermaLinkData, setAllLinkData } =
  linkDataSlice.actions;

export default linkDataSlice.reducer;
