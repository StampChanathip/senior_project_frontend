import "./App.css";

import TimeSlider from "./Components/TimeSlider";
import MainMap from "./Components/MainMap";
import ScreenWrapper from "./Components/ScreenWrapper";
import ImportForm from "./Components/ImportForm";
import SideBarMenu from "./Components/SideBarMenu";
import { Box } from "@mui/material";
import NoFileText from "./Components/NoFileText";
import path1 from "./MockData/path1.json";
import path2 from "./MockData/path2.json";
import mockData from "./MockData/mockData.json";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setExcelData } from "./Redux/excelDataSlice";

function App() {
  const dispatch = useDispatch();
  const { excelData } = useSelector((state) => state.excelData);
  useEffect(() => {
    // dispatch(setExcelData(mockData));
    // dispatch(setExcelData(path1));
    // dispatch(setExcelData(path2));
  }, []);

  return (
    <ScreenWrapper>
      {excelData.length === 0 ? (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <ImportForm />
          <NoFileText />
        </Box>
      ) : (
        <Box>
          <TimeSlider />
          <SideBarMenu />
          <MainMap />
        </Box>
      )}
    </ScreenWrapper>
  );
}

export default App;
