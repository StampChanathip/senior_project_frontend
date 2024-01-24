import { useEffect, useState } from "react";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import L from "leaflet";
import { Box, Typography } from "@mui/material";
import { Tooltip, Popup } from "react-leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSliderValue } from "../Redux/timeSliderSlice";

const icon = (url) =>
  L.icon({
    iconSize: [35, 25],
    popupAnchor: [2, -20],
    iconUrl: url,
  });

const car = (status) => {
  const carAvailable = icon("Assets/Icon/Vehicle_Available.png");
  const carNotAvailable = icon("Assets/Icon/Vehicle_Not_Available.png");
  const carFull = icon("Assets/Icon/Vehicle_Full.png");
  const carCharging = icon("Assets/Icon/Vehicle_Charging.png");

  if (status === "run") {
    return carAvailable;
  } else if (status === "charging") {
    return carCharging;
  }
};

const MovingMarker = ({ path, carId, status }) => {
  const [position, setPosition] = useState(path[0]);
  const { isPlay, sliderValue } = useSelector((state) => state.timeSlider);
  const dispatch = useDispatch();

  useEffect(() => {
    let cursor = sliderValue;
    if (isPlay) {
      const interval = setInterval(() => {
        if (cursor < path.length - 1) {
          cursor += 1;
          dispatch(setSliderValue(cursor));
          setPosition(path[cursor]);
          console.log(path[cursor]);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlay, path]);

  return (
    <Box>
      <ReactLeafletDriftMarker
        icon={car(status)}
        position={position}
        duration={1000}
      >
        <Popup minWidth={90}>
          <span>This is car</span>
        </Popup>
        {carId < 10 ? (
          <Tooltip className="oneDigit" direction="right" permanent={true}>
            <Typography fontSize={14} fontWeight={700}>
              {carId}
            </Typography>
          </Tooltip>
        ) : (
          <Tooltip className="twoDigit" direction="right" permanent={true}>
            <Typography fontSize={14} fontWeight={700}>
              {carId}
            </Typography>
          </Tooltip>
        )}
      </ReactLeafletDriftMarker>
    </Box>
  );
};

export default MovingMarker;
