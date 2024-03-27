import { useEffect, useState } from "react";
import L from "leaflet";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { Tooltip, Popup } from "react-leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSliderValue } from "../Redux/timeSliderSlice";
import removeConsecutiveDuplicates from "../Utils/removeConsecutiveDuplicates";
import {
  setIsShowPassenger,
  setPassengerDetail,
} from "../Redux/passDetailSlice";

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

  if (status === "run" || status === "pick" || status === "drop") {
    return carAvailable;
  } else if (status === "charging") {
    return carCharging;
  } else if (status === "full") {
    return carFull;
  } else if (status === "notAvailable") {
    return carNotAvailable;
  }
};

const carStatus = (status) => {
  if (status === "run") {
    return "Running";
  } else if (status === "pick") {
    return "Picking Passenger";
  } else if (status === "drop") {
    return "Dropping Passenger";
  } else if (status === "charging") {
    return "Charging";
  }
};

const CarPopupContent = ({ currentCar }) => {
  const havePassenger = currentCar.passengers.length !== 0;
  const dispatch = useDispatch();
  const { isShowPassenger } = useSelector((state) => state.passengerDetail);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        color: "#D9D9D9",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Box sx={{ fontSize: "16px" }}>Vehicle No. {currentCar.carId}</Box>
        <Box sx={{ fontSize: "12px" }}>{carStatus(currentCar.status)}</Box>
      </Box>
      <Divider
        flexItem
        color={"#D9D9D9"}
        sx={{ marginBottom: "10px", marginTop: "4px" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            color: "#D9D9D9",
          }}
        >
          <Box sx={{ fontSize: "14px" }}>Battery Percentage</Box>
          <Box>Last charge : 06.00</Box>
        </Box>
        <Box position="relative">
          <Box
            component="img"
            src="Assets/Icon/Battery.png"
            sx={{ width: "48px" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "3px",
              left: "6px",
              color: "#1e1e1e",
              fontWeight: "800",
              fontStyle: "italic",
            }}
          >
            {currentCar.battery} %
          </Box>
        </Box>
      </Box>
      <Box
        onClick={() => {
          if (havePassenger) {
            dispatch(setIsShowPassenger(!isShowPassenger));
            dispatch(
              setPassengerDetail({
                carId: currentCar.carId,
                detail: currentCar.passengers,
              })
            );
          }
        }}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "8px",
          cursor: havePassenger ? "pointer" : "default",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            color: "#D9D9D9",
          }}
        >
          <Box sx={{ fontSize: "14px" }}>Passengers</Box>
          {havePassenger && (
            <Box sx={{ fontSize: "10px" }}>Click to see passenger detail</Box>
          )}
        </Box>
        <Stack direction="row" spacing={0.5}>
          {havePassenger ? (
            currentCar.passengers.map((passenger) => {
              return (
                <Avatar
                  sx={{
                    width: 20,
                    height: 20,
                    fontSize: "12px",
                    backgroundColor: "#D9D9D9",
                    color: "#1e1e1e",
                    fontWeight: "700",
                  }}
                >
                  {passenger.id}
                </Avatar>
              );
            })
          ) : (
            <Box>No Passengers</Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

const MovingMarker = ({ carData, carId }) => {
  const dispatch = useDispatch();
  const { isPlay, sliderValue, playSpeed } = useSelector(
    (state) => state.timeSlider
  );
  const path = removeConsecutiveDuplicates(
    carData.map((i) => [...i["link"].coordinates]).flat(1)
  );

  const [carCursor, setCarCursor] = useState(0);
  const [cursor, setCursor] = useState(1);
  const [position, setPosition] = useState(
    carData[carCursor]["link"].coordinates[0]
  );
  const currentCar = carData[carCursor];
  const [status, setStatus] = useState("run");
  const [passengerChange, setPassengerChange] = useState(carData[carCursor]["passengerChange"])

  useEffect(() => {
    // console.log(passengerChange)
    // console.log(carData)
  }, [passengerChange]);

  useEffect(() => {
    if (isPlay && carCursor < carData.length) {
      if (cursor < currentCar["link"].coordinates.length - 1) {
        const interval = setInterval(() => {
          setCursor((curr) => curr + 1);
          dispatch(setSliderValue(cursor));
          setPosition(currentCar["link"].coordinates[cursor]);
          setStatus(currentCar.status);
          setPassengerChange(currentCar.passengerChange)
        }, 1000 / playSpeed);
        return () => clearInterval(interval);
      } else if (carCursor < carData.length - 1) {
        setCarCursor((curr) => curr + 1);
        setStatus(currentCar.status);
        setCursor(0);
      }
    }
  }, [isPlay, path, sliderValue]);

  return (
    <Box>
      <ReactLeafletDriftMarker
        icon={car(status)}
        position={position}
        duration={1000}
      >
        <Popup minWidth={90} className="car-popup">
          <CarPopupContent currentCar={currentCar} />
        </Popup>
        {carId < 10 ? (
          <Tooltip className="oneDigit" direction="right" permanent={true}>
            <Box sx={{display:"flex", flexDirection:"row"}}>
              <Typography fontSize={12} fontWeight={700} color={"white"}>
                {carId}
              </Typography>
              {passengerChange !== 0 && <Typography sx={{marginLeft:"12px"}} fontSize={12} fontWeight={700} color={"white"}>
              {(passengerChange > 0) ? `+${passengerChange}` : passengerChange}
              </Typography>}
            </Box>
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
