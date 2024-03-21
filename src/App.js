import "./App.css";

import TimeSlider from "./Components/TimeSlider";
import MainMap from "./Components/MainMap";
import ScreenWrapper from "./Components/ScreenWrapper";
import SideBarMenu from "./Components/SideBarMenu";
import { Box, ThemeProvider, createTheme } from "@mui/material";
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
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#d9d9d9",
      },
      secondary: {
        main: "#1e1e1e",
      },
      background: {
        default: "#d9d9d9",
        paper: "#1E1E1E",
      },
      text: {
        primary: "#d9d9d9",
        secondary: "#1e1e1e",
      },
    },
  });
  useEffect(() => {
    // dispatch(setExcelData(mockData));
    // dispatch(setExcelData(path1));
    dispatch(setExcelData(path2));
    // console.log(excelData);
  }, []);

  return (
    <ScreenWrapper>
      <ThemeProvider theme={theme}>
        {excelData.length === 0 ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <SideBarMenu />
            <NoFileText />
          </Box>
        ) : (
          <Box>
            <TimeSlider />
            <SideBarMenu />
            <MainMap />
          </Box>
        )}
      </ThemeProvider>
    </ScreenWrapper>
  );
}

export default App;
