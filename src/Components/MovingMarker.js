import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Box, Typography } from "@mui/material";
import { Tooltip, Popup } from "react-leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSliderValue } from "../Redux/timeSliderSlice";
import removeConsecutiveDuplicates from "../Utils/removeConsecutiveDuplicates";

const icon = (url) =>
  L.icon({
    iconSize: [24, 24],
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
  } else if (status === "full") {
    return carFull;
  } else if (status === "notAvailable") {
    return carNotAvailable;
  } else if (status === "pick") {
    return carAvailable;
  }
};

const MovingMarker = ({ carData, carId }) => {
  const dispatch = useDispatch();
  const { isPlay, sliderValue } = useSelector((state) => state.timeSlider);
  const path = removeConsecutiveDuplicates(
    carData.map((i) => [...i.positions]).flat(1)
  );

  const [position, setPosition] = useState(path[0]);
  const [status, setStatus] = useState("run");
  const [cursor, setCursor] = useState(1);

  useEffect(() => {
    // console.log(path);
    // console.log(carData);
  }, []);

  useEffect(() => {
    if (isPlay) {
      const interval = setInterval(() => {
        if (cursor < path.length - 1) {
          setCursor(cursor + 1);
          dispatch(setSliderValue(cursor));
          setPosition(path[cursor]);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlay, path, sliderValue]);

  return (
    <Box>
      <ReactLeafletDriftMarker
        icon={car(status)}
        position={position}
        duration={1000}
      >
        <Popup minWidth={90}>
          <span>
            Car No.{carId} at {path[cursor].lat}, {path[cursor].lng}
          </span>
        </Popup>
        {carId < 10 ? (
          <Tooltip className="oneDigit" direction="right" permanent={true}>
            <Typography fontSize={12} fontWeight={700} color={"white"}>
              {carId}
            </Typography>
          </Tooltip>
        ) : (
          <Tooltip className="twoDigit" direction="right" permanent={true}>
            <Typography fontSize={12} fontWeight={700} color={"white"}>
              {carId}
            </Typography>
          </Tooltip>
        )}
      </ReactLeafletDriftMarker>
    </Box>
  );
};

export default MovingMarker;
