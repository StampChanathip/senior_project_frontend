import { Box, Slider, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useDispatch } from "react-redux";
import { playClicked, setSliderValue } from "../Redux/timeSliderSlice";
import { useSelector } from "react-redux";

const TimeSlider = () => {
  const dispatch = useDispatch();
  const { isPlay, sliderValue } = useSelector((state) => state.timeSlider);

  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        bottom: "18px",
        right: "128px",
        width: "80vw",
        alignItems: "center",
        backgroundColor: "#D9D9D9",
        borderRadius: "12px",
        padding: "8px",
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={() => dispatch(playClicked())}
        sx={{ marginRight: "12px" }}
      >
        {isPlay ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      {/* <Slider
        defaultValue={0}
        value={sliderValue}
        onChange={(e) => dispatch(setSliderValue(e.target.value))}
        step={1}
        marks
        min={0}
        max={10}
        sx={{ width: 800 }}
      /> */}
    </Box>
  );
};

export default TimeSlider;
