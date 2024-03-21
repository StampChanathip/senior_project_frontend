import { Box, Slider, IconButton, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useDispatch } from "react-redux";
import {
  playClicked,
  setSliderValue,
  setPlaySpeed,
} from "../Redux/timeSliderSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const TimeSlider = () => {
  const dispatch = useDispatch();
  const { isPlay, sliderValue, playSpeed } = useSelector(
    (state) => state.timeSlider
  );

  useEffect(() => {
    // console.log(playSpeed);
  }, [playSpeed]);

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
      {playSpeed === 2 ? (
        <IconButton
          onClick={() => dispatch(setPlaySpeed(1))}
          sx={{
            marginX: "12px",
            width: "36px",
            height: "36px",
            backgroundColor: "#C4C4C4",
          }}
        >
          <Typography fontSize={18} fontWeight={600}>
            x2
          </Typography>
        </IconButton>
      ) : (
        <IconButton
          onClick={() => dispatch(setPlaySpeed(2))}
          sx={{
            marginX: "12px",
            width: "36px",
            height: "36px",
          }}
        >
          <Typography fontSize={18} fontWeight={600}>
            x2
          </Typography>
        </IconButton>
      )}
      {/* {playSpeed === 4 ? (
        <IconButton
          onClick={() => dispatch(setPlaySpeed(1))}
          sx={{
            marginRight: "12px",
            width: "36px",
            height: "36px",
            backgroundColor: "#C4C4C4",
          }}
        >
          <Typography fontSize={18} fontWeight={600}>
            x4
          </Typography>
        </IconButton>
      ) : (
        <IconButton
          onClick={() => dispatch(setPlaySpeed(4))}
          sx={{ marginRight: "12px", width: "36px", height: "36px" }}
        >
          <Typography fontSize={18} fontWeight={600}>
            x4
          </Typography>
        </IconButton>
      )} */}

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
