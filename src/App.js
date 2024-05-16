import "./App.css";

import MainMap from "./Components/MainMap";
import ScreenWrapper from "./Components/ScreenWrapper";
import SideBarMenu from "./Components/SideBarMenu";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import NoFileText from "./Components/NoFileText";
import { setLoading } from "./Redux/preloaderSlice";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setExcelData } from "./Redux/excelDataSlice";
import { setAllLinkData } from "./Redux/linkDataSlice";
import { getCarDetails } from "./Api/mapApi";

function App() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const isMockTest = urlParams.get("mockTest") === "true";

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
    const fetchData = async() => {
      dispatch(setLoading(true));
      const data = await getCarDetails()
      if(data){
        dispatch(setExcelData(data))
        dispatch(setAllLinkData(data))
      }
      dispatch(setLoading(false));
    }

    fetchData()
  }, []);

  return (
    <ScreenWrapper>
      <ThemeProvider theme={theme}>
        {excelData.length === 0 && !isMockTest ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <SideBarMenu />
            <NoFileText />
          </Box>
        ) : (
          <Box>
            <SideBarMenu />
            <MainMap />
          </Box>
        )}
      </ThemeProvider>
    </ScreenWrapper>
  );
}

export default App;
