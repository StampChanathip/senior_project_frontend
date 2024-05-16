import { Marker } from "react-leaflet";
import L from "leaflet";
import { Box, Divider, Typography } from "@mui/material";
import { Tooltip, Popup } from "react-leaflet";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { findCarbyPosition } from "../Utils/findCarObject";
import ElectricCarRoundedIcon from "@mui/icons-material/ElectricCarRounded";
import {
  addStationHistory,
  setIsShowStation,
} from "../Redux/stationDetailSlice";

const icon = (url) =>
  L.icon({
    iconSize: [24, 24],
    popupAnchor: [2, -20],
    iconUrl: url,
  });

const stationIcon = (status) => {
  const stationAvailable = icon("Assets/Icon/Charging_Station.png");
  const stationFull = icon("Assets/Icon/Charging_Station_Full.png");

  if (status === "available") {
    return stationAvailable;
  } else if (status === "full") {
    return stationFull;
  }
};

const StationPopupContent = ({ stationData, stationId }) => {
  // console.log( stationId, stationData)
  return (
    <Box>
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
          <Box sx={{ fontSize: "16px" }}>Charging Station {stationId}</Box>
        </Box>
        <Divider
          flexItem
          color={"#D9D9D9"}
          sx={{ marginBottom: "4px", marginTop: "4px" }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography>Charging</Typography>
            {stationData.length !== 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "8px",
                  columnGap: "16px",
                }}
              >
                {stationData.map((car) => {
                  return (
                    <Box sx={{ position: "relative" }} key={Math.random()}>
                      <img
                        alt="charging car"
                        src="Assets/Icon/Vehicle_Charging.png"
                        className="charging-car-icon"
                      />
                      {Number(car.detail.carId) < 10 ? (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: "11px",
                            left: "12px",
                            fontSize: "14px",
                            fontWeight: 700,
                          }}
                        >
                          {car.detail.carId}
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: "11px",
                            left: "9px",
                            fontSize: "14px",
                            fontWeight: 700,
                          }}
                        >
                          {car.detail.carId}
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Box sx={{ marginLeft: "16px" }}>
                <PanoramaFishEyeIcon
                  sx={{ marginRight: "16px", width: 32, height: 32 }}
                />
                <PanoramaFishEyeIcon
                  sx={{ marginRight: "16px", width: 32, height: 32 }}
                />
                <PanoramaFishEyeIcon
                  sx={{ marginRight: "16px", width: 32, height: 32 }}
                />
                <PanoramaFishEyeIcon
                  sx={{ marginRight: "16px", width: 32, height: 32 }}
                />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};

const ChargeStationMarker = ({ station, stationId }) => {
  const dispatch = useDispatch();
  const lat = station.geometry.coordinates[1];
  const lng = station.geometry.coordinates[0];
  const { carData } = useSelector((state) => state.carData);
  const { stationHistory } = useSelector(
    (state) => state.stationData
  );
  const [stationData, setStationData] = useState([]);

  useEffect(() => {
    const cars = findCarbyPosition(carData, station.geometry.coordinates);
    setStationData(cars);
  }, [carData, station.geometry.coordinates]);

  useEffect(() => {
    // console.log(stationId, stationDetail[stationId])
    // console.log(stationHistory)
  }, [stationHistory]);

  const clickHandler = () => {
    dispatch(setIsShowStation(true))
  }

  return (
    <Box>
      <Marker
        position={{ lat: lat, lng: lng }}
        icon={
          stationData.length >= 4
            ? stationIcon("full")
            : stationIcon("available")
        }
        zIndex={9}
        pane="markerPane"
        eventHandlers={{
          click: () => clickHandler()
        }}
      >
        <Popup minWidth={90} className="car-popup">
          <StationPopupContent
            stationData={stationData}
            stationId={stationId}
          />
        </Popup>
        <Tooltip
          className="charging-station-capacity"
          direction="right"
          permanent={true}
        >
          {stationData && stationData.length !== 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ElectricCarRoundedIcon
                sx={{ color: stationData.length >= 4 ? "red" : "white" }}
                fontSize="small"
              />
              <Typography
                fontSize={16}
                fontWeight={700}
                color={stationData.length >= 4 ? "red" : "white"}
              >
                {stationData.length}
              </Typography>
            </Box>
          )}
        </Tooltip>
      </Marker>
    </Box>
  );
};

export default ChargeStationMarker;
