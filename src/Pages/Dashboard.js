import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getChargeHistoryData, getDashboardData } from "../Api/dashboardApi";
import { waitedTimeParse } from "../Components/PassengerDetails";
import HomeIcon from "@mui/icons-material/Home";

const chartStyle = {
  "& .MuiChartsAxis-left .MuiChartsAxis-tick": {
    strokeWidth: "2",
    stroke: "#D9D9D9",
  },
  "& .MuiChartsAxis-bottom .MuiChartsAxis-tick": {
    strokeWidth: "2",
    stroke: "#D9D9D9",
  },
  "& .MuiChartsAxisHighlight-root": {
    strokeWidth: "2",
    stroke: "#D9D9D9",
  },
  "& .MuiChartsAxis-left .MuiChartsAxis-line": {
    stroke: "#D9D9D9",
    strokeWidth: 2,
  },
  "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
    stroke: "#D9D9D9",
    strokeWidth: 2,
  },
  "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
    strokeWidth: "2",
    fill: "#D9D9D9",
  },
  "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
    strokeWidth: "0.4",
    fill: "#D9D9D9",
  },
  "& .MuiChartsLegend-series text": {
    fill: "#D9D9D9 !important",
  },
  "& .MuiChartsAxis-label text": {
    fill: "#D9D9D9 !important",
  },
};

const stationMapping = {
  99821: "station1",
  99827: "station2",
  99828: "station3",
  99829: "station4",
}

const DashboardPage = () => {
  const date = dayjs("2024-01-01T00:00:00");
  const [dashboardData, setDashboardData] = useState([]);
  const [passengerData, setPassengerData] = useState([]);
  const [carData, setCarData] = useState([]);
  const [carId, setCarId] = useState(1);
  const [chargeHistory, setChargeHistory] = useState({
    99821: {},
    99827: {},
    99828: {},
    99829: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDashboardData();
      const chargeHistory = await getChargeHistoryData();
      setDashboardData(res);

      const stationCount = {
        99821: {},
        99827: {},
        99828: {},
        99829: {},
      };

      const startTime = dayjs("2024-01-01T06:30:00");
      const timePool = Array.from(Array(16).keys()).map((i, idx) => {
        return startTime.clone().add(idx, "hour").format("HH:mm:ss");
      });

      Object.keys(stationCount).forEach((id) => {
        const stationTime = chargeHistory
          .filter((i) => i.stationId === id)
          .map((each) => {
            const timeSplit = each.timeArrival.split(":");
            const timeConverted = date
              .clone()
              .add(timeSplit[0], "hour")
              .add(timeSplit[1], "minutes")
              .add(timeSplit[2], "second");
            return timeConverted.format("HH:mm:ss");
          });

        const chargeCount = timePool.map((time) => {
          const validTime = stationTime.filter(
            (each) => each.slice(0, 2) === time.slice(0, 2)
          );
          return [time, validTime.length];
        });

        chargeCount.forEach((each) => {
          stationCount[id][each[0]] = each[1];
        });
      });

      setChargeHistory(stationCount);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setCarId(e.target.value);
    setPassengerData(dashboardData[e.target.value - 1].passengerData);
    setCarData(dashboardData[e.target.value - 1]);
  };

  useEffect(() => {
    if (dashboardData[carId - 1]) {
      setPassengerData(dashboardData[carId - 1].passengerData);
      setCarData(dashboardData[carId - 1]);
    }
  }, [dashboardData]);

  const timeParse = (time) => {
    const timeSplit = time.split(":");
    if (timeSplit[0] === "00") {
      return `${timeSplit[1]} mins`;
    } else {
      return `${timeSplit[0]} hrs ${timeSplit[1]} mins`;
    }
  };

  return (
    <Box sx={{ padding: "32px 18px", backgroundColor: "#1E1E1E" }}>
      <Box sx={{ display: "flex", flexDirection: "row", marginBottom: "24px" }}>
        <Link to="/">
          <HomeIcon sx={{ color: "#D9D9D9" }} fontSize={"large"} />
        </Link>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          {dashboardData && (
            <FormControl sx={{ width: "164px" }}>
              <Typography
                sx={{ color: "#D9D9D9", "&.Mui-focused": { color: "#D9D9D9" } }}
              >
                Car Id
              </Typography>
              <Select
                id="demo-simple-select"
                value={carId}
                onChange={handleChange}
                sx={{
                  color: "#D9D9D9",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D9D9D9",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D9D9D9",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D9D9D9",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "#D9D9D9",
                  },
                }}
              >
                {dashboardData.map((data, i) => {
                  return (
                    <MenuItem value={i + 1} key={i}>
                      {i + 1}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
        </Box>
      </Box>
      {dashboardData && (
        <Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box>
              <Typography fontSize={24} color={"#D9D9D9"}>
                Charge Station Vehicle Count
              </Typography>
              <LineChart
                sx={chartStyle}
                xAxis={[
                  {
                    scaleType: "utc",
                    data: Object.keys(chargeHistory["99821"]).map((time) => {
                      const timeSplit = time.split(":");
                      const timeConverted = date
                        .clone()
                        .add(timeSplit[0], "hour")
                        .add(timeSplit[1], "minutes")
                        .add(timeSplit[2], "second");
                      return timeConverted;
                    }),
                    valueFormatter: (v) => dayjs(v).format("HH:mm:ss"),
                    label: "Station Time",
                  },
                ]}
                series={[
                  {
                    id: "99821",
                    label: "Station 1",
                    data: Object.values(chargeHistory["99821"]),
                    stack: "total",
                  },
                  {
                    id: "99827",
                    label: "Station 2",
                    data: Object.values(chargeHistory["99827"]),
                    stack: "total",
                  },
                  {
                    id: "99828",
                    label: "Station 3",
                    data: Object.values(chargeHistory["99828"]),
                    stack: "total",
                  },
                  {
                    id: "99829",
                    label: "Station 4",
                    data: Object.values(chargeHistory["99829"]),
                    stack: "total",
                  },
                ]}
                yAxis={[{ label: "Station Vehicle Count" }]}
                width={600}
                height={300}
              />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Typography fontSize={24} color={"#D9D9D9"}>
                Vehicle {carData.carId} Data Summary
              </Typography>
              <Box>
              {carData.length !== 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "16px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      columnGap: "24px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "8px",
                        backgroundColor: "#D9D9D9",
                        width: "132px",
                        height: "132px",
                        borderRadius: "24px",
                      }}
                    >
                      <Typography
                        fontSize={16}
                        sx={{ marginBottom: "8px" }}
                        fontWeight={800}
                      >
                        Max Waited Time
                      </Typography>
                      <Typography fontSize={16}>
                        {waitedTimeParse(carData.maxWaitedTime)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "8px",
                        backgroundColor: "#D9D9D9",
                        width: "132px",
                        height: "132px",
                        borderRadius: "24px",
                      }}
                    >
                      <Typography
                        fontSize={16}
                        fontWeight={800}
                        sx={{ marginBottom: "8px", textAlign: "center" }}
                      >
                        Total Empty Trip Length
                      </Typography>
                      <Typography fontSize={16}>
                        {Math.round(carData.totalEmptyTripLength * 100) / 100}{" "}
                        Km
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "8px",
                        backgroundColor: "#D9D9D9",
                        width: "132px",
                        height: "132px",
                        borderRadius: "24px",
                      }}
                    >
                      <Typography
                        fontSize={16}
                        fontWeight={800}
                        sx={{ marginBottom: "8px", textAlign: "center" }}
                      >
                        Total Service Length
                      </Typography>
                      <Typography fontSize={16}>
                        {Math.round(carData.totalServiceLength * 100) / 100} Km
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "8px",
                        backgroundColor: "#D9D9D9",
                        width: "132px",
                        height: "132px",
                        borderRadius: "24px",
                      }}
                    >
                      <Typography
                        fontSize={16}
                        fontWeight={800}
                        sx={{ marginBottom: "8px", textAlign: "center" }}
                      >
                        Total Service Time
                      </Typography>
                      <Typography fontSize={16}>
                        {timeParse(carData.totalPostTravelTime)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      columnGap: "24px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "8px",
                        backgroundColor: "#D9D9D9",
                        width: "132px",
                        height: "132px",
                        borderRadius: "24px",
                      }}
                    >
                      <Typography
                        fontSize={16}
                        sx={{ marginBottom: "8px" }}
                        fontWeight={800}
                      >
                        Total Stop Time
                      </Typography>
                      <Typography fontSize={16}>
                        {timeParse(carData.totalStopTime)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "8px",
                        backgroundColor: "#D9D9D9",
                        width: "264px",
                        borderRadius: "24px",
                      }}
                    >
                      {carData.chargeLap.length === 0 ? (
                        <Box>
                          <Typography fontSize={16} fontWeight={800}>
                            No Charge History
                          </Typography>
                        </Box>
                      ) : (
                        carData.chargeLap.map((chargeLap) => {
                          return (
                            <Box sx={{ marginBottom: "8px" }}>
                              <Typography
                                fontSize={16}
                                fontWeight={800}
                                sx={{
                                  marginBottom: "4px",
                                  textAlign: "center",
                                }}
                              >
                                Charging Lap {chargeLap.lap} at {stationMapping[chargeLap.stationId]}
                              </Typography>
                              <Typography mr={1}></Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  
                                  <Typography mr={1}>Time Arrival:</Typography>
                                  <Typography mr={1}>Time Spent:</Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <Typography fontSize={16}>
                                    {chargeLap.timeArrival}
                                  </Typography>
                                  <Typography fontSize={16}>
                                    {timeParse(chargeLap.timeCharged)}
                                  </Typography>
                                  
                                </Box>
                              </Box>
                            </Box>
                          );
                        })
                      )}
                    </Box>
                  </Box>
                </Box>
              )}
              </Box>
            </Box>
          </Box>

          <Typography fontSize={24} color={"#D9D9D9"}>
            Vehicle {carData.carId} Passengers Amount by Time
          </Typography>
          <LineChart
            sx={chartStyle}
            xAxis={[
              {
                scaleType: "utc",
                data: passengerData
                  .map((value) => value.time)
                  .map((time) => {
                    const timeSplit = time.split(":");
                    const timeConverted = date
                      .clone()
                      .add(timeSplit[0], "hour")
                      .add(timeSplit[1], "minutes")
                      .add(timeSplit[2], "second");
                    return timeConverted;
                  }),
                valueFormatter: (v) => dayjs(v).format("HH:mm:ss"),
                label: "Vehicle Time",
              },
            ]}
            series={[
              {
                data: passengerData.map((value) => value.passengerCount),
                color: "#d9d9d9",
                label: "passengers",
              },
            ]}
            yAxis={[{ label: "Vehicle Passengers" }]}
            width={1500}
            height={500}
          />
        </Box>
      )}
    </Box>
  );
};

export default DashboardPage;
