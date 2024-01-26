import "./App.css";

import TimeSlider from "./Components/TimeSlider";
import MainMap from "./Components/MainMap";
import ScreenWrapper from "./Components/ScreenWrapper";
import ImportForm from "./Components/ImportForm";
import SideBarMenu from "./Components/SideBarMenu";
import { Box } from "@mui/material";
import NoFileText from "./Components/NoFileText";

import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const { excelData } = useSelector((state) => state.excelData);
  useEffect(() => console.log(excelData), [excelData]);
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
