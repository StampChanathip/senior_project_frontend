import { useEffect, useState } from "react";
import L from "leaflet";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { Tooltip, Popup, Marker } from "react-leaflet";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setIsShowPassenger,
  setPassengerDetail,
} from "../Redux/passDetailSlice";
import moment from "moment";
import nodeName from "../StaticData/nodeName.json"

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
  const { passengerDetail } = useSelector((state) => state.passengerDetail);
  const [lastChargeTime, setLastChargeTime] = useState(
    moment("2024-01-01T06:30:00Z").subtract(7, "h").format("hh:mm:ss")
  );
  const passengers = [];
  currentCar.passengers.forEach((i) => {
    if (i.amount > 1) {
      const pass = [];
      for (let j = 0; j < i.amount; j++) {
        pass.push(i);
      }
      passengers.push(...pass);
    } else {
      passengers.push(i);
    }
  });
  useEffect(() => {
    console.log(currentCar);
    if (currentCar.carId === passengerDetail.carId) {
      dispatch(
        setPassengerDetail({
          carId: currentCar.carId,
          detail: currentCar.passengers,
          time: currentCar.time,
        })
      );
    }
  }, [currentCar]);
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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ fontSize: "16px" }}>Vehicle No. {currentCar.carId}</Box>
          <Box sx={{ fontSize: "12px" }}>{nodeName[currentCar.nodeFrom]}</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Box sx={{ fontSize: "12px" }}>{currentCar.arrivalTime}</Box>
          <Box sx={{ fontSize: "12px" }}>{carStatus(currentCar.status)}</Box>
        </Box>
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
            alignItems: "flex-start",
            color: "#D9D9D9",
          }}
        >
          <Box sx={{ fontSize: "14px" }}>Battery Percentage</Box>
          <Box>
            Last charge :{" "}
            {moment(currentCar.lastChargeTime)
              .subtract(7, "h")
              .format("hh:mm:ss")}
          </Box>
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
            dispatch(setIsShowPassenger(true));
            dispatch(
              setPassengerDetail({
                carId: currentCar.carId,
                detail: currentCar.passengers,
                time: currentCar.time,
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
            passengers.map((passenger) => {
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

export default CarPopupContent;
