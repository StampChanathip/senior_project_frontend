import { useEffect, useState } from "react";
import L from "leaflet";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { Tooltip, Popup, Marker } from "react-leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
import { findCarbyPosition } from "../Utils/findCarObject";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import CarPopupContent from "./CarPassengerPopup";
const marginConfig = [0, 40, 72, 104, 136];
const MovingMarker = ({ carId }) => {
  const dispatch = useDispatch();
  const { carData } = useSelector((state) => state.carData);
  const { linkData } = useSelector((state) => state.linkData);
  const [position, setPosition] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [samePositionIndex, setSamePositionIndex] = useState(0);
  const passengerChange = carData[carId].detail
    ? carData[carId].detail.passengerChange
    : 0;

  const icon = (url) =>
    L.icon({
      iconSize: [24, 24],
      popupAnchor: [2, -20],
      iconAnchor: [12, (samePositionIndex + 1) * 16],
      iconUrl: url,
    });

  const car = (status) => {
    const carAvailable = icon("Assets/Icon/Vehicle_Available.png");
    const carNotAvailable = icon("Assets/Icon/Vehicle_Not_Available.png");
    const carFull = icon("Assets/Icon/Vehicle_Full.png");
    const carCharging = icon("Assets/Icon/Vehicle_Charging.png");

    if (status === "run" || status === "pick" || status === "drop") {
      return carAvailable;
    } else if (status === "charging") {
      return carCharging;
    } else if (status === "full") {
      return carFull;
    } else if (status === "nan") {
      return carNotAvailable;
    }
  };

  let interval;
  useEffect(() => {
    setCursor(0);
    setSamePositionIndex(0);
    setIsRunning(linkData[carId] && linkData[carId].link.length !== 0);
  }, [linkData[carId]]);

  useEffect(() => {
    if (linkData[carId] && isRunning) {
      interval = setInterval(() => {
        setCursor((curr) => curr + 1);
      }, 50);
      return () => clearInterval(interval);
    }
  });

  useEffect(() => {
    if (linkData[carId] && cursor + 1 >= linkData[carId].link.length) {
      setPosition(linkData[carId].link[cursor]);
      setIsRunning(false);
      clearInterval(interval);
    }

    if (linkData[carId]) {
      const car = findCarbyPosition(
        carData,
        linkData[carId].link[cursor]
          ? linkData[carId].link[cursor].toReversed()
          : [100.52287826176608, 13.739723076847634]
      );
      setSamePositionIndex(
        car.findIndex((i) => Number(i.detail.carId) === carId) >= 0
          ? car.findIndex((i) => Number(i.detail.carId) === carId)
          : 0
      );
    }
  }, [cursor]);

  useEffect(() => {
    // console.log(carId)
  })

  return (
    <Box sx={{ zIndex: 2000, position: "relative" }}>
      {linkData[carId] &&
        linkData[carId].link &&
        linkData[carId].link[cursor] && (
          <ReactLeafletDriftMarker
            icon={car(carData[carId].detail.status ?? "run")}
            position={{
              lat: linkData[carId].link[cursor][0] ?? 100.52287826176608,
              lng: linkData[carId].link[cursor][1] ?? 13.739723076847634,
            }}
            duration={100}
            zIndex={10}
            pane={"markerPane"}
          >
            <Popup minWidth={90} className="car-popup">
              <CarPopupContent currentCar={carData[carId].detail} />
            </Popup>
            {carId < 10 ? (
              <Tooltip className="oneDigit" direction="right" permanent={true}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom:
                      samePositionIndex !== 0
                        ? `${marginConfig[samePositionIndex]}px`
                        : "8px",
                  }}
                >
                  <Typography fontSize={12} fontWeight={700} color={"white"}>
                    {carId}
                  </Typography>
                  {passengerChange !== 0 && (
                    <Typography
                      sx={{ marginLeft: "10px" }}
                      fontSize={12}
                      fontWeight={700}
                      color={"white"}
                    >
                      {passengerChange > 0
                        ? `+${passengerChange}`
                        : passengerChange}
                    </Typography>
                  )}
                </Box>
              </Tooltip>
            ) : (
              <Tooltip className="twoDigit" direction="right" permanent={true}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom:
                      samePositionIndex !== 0
                        ? `${marginConfig[samePositionIndex]}px`
                        : "8px",
                  }}
                >
                  <Typography fontSize={12} fontWeight={700} color={"white"}>
                    {carId}
                  </Typography>
                  {passengerChange !== 0 && (
                    <Typography
                      sx={{ marginLeft: "8px" }}
                      fontSize={12}
                      fontWeight={700}
                      color={"white"}
                    >
                      {passengerChange > 0
                        ? `+${passengerChange}`
                        : passengerChange}
                    </Typography>
                  )}
                </Box>
              </Tooltip>
            )}
          </ReactLeafletDriftMarker>
        )}
    </Box>
  );
};

export default MovingMarker;
