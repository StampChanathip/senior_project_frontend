import { Box, Avatar, Divider, Slide, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setIsShowPassenger } from "../Redux/passDetailSlice";
import { useEffect } from "react";
import nodeName from "../MockData/nodeName.json"
import moment from "moment/moment";

export const waitedTimeParse = (time) => {
  var m = Math.floor((time % 3600) / 60);
  var s = Math.floor((time % 3600) % 60);

  var mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " sec") : "";
  return mDisplay + sDisplay;
};

const PassengersDetail = () => {
  const dispatch = useDispatch();
  const { isShowPassenger, passengerDetail } = useSelector(
    (state) => state.passengerDetail
  );
  const passengers = [];
  passengerDetail.detail.forEach((i) => {
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
    if (passengerDetail.detail.length === 0) {
      dispatch(setIsShowPassenger(false));
    }
  }, [passengerDetail]);
  return (
    <Slide direction="left" in={isShowPassenger} mountOnEnter unmountOnExit>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          right: "0px",
          top: "0px",
          width: "450px",
          color: "#D9D9D9",
          backgroundColor: "#1E1E1E",
          borderBottomLeftRadius: "16px",
          padding: "0px 16px 12px 16px   ",
          zIndex: 5000,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "105%",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            onClick={() => dispatch(setIsShowPassenger(false))}
            sx={{ width: "32px", height: "32px", color: "#D9D9D9" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Box sx={{ fontSize: "16px" }}>Passenger Detail</Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ fontSize: "14px", marginRight: "12px" }}>
              Time:
              {moment(passengerDetail.time).subtract(7, "h").format("hh:mm:ss")}
            </Box>
            <Box sx={{ fontSize: "14px" }}>
              Vehicle No. {passengerDetail.carId}
            </Box>
          </Box>
        </Box>
        <Divider
          flexItem
          color={"#D9D9D9"}
          sx={{ marginBottom: "10px", marginTop: "4px" }}
        />

        {passengerDetail.detail &&
          passengers.map((passenger, idx) => {
            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginY: "6px",
                  height:"80px"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "12px",
                    width: "84px",
                    marginRight: "18px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 35,
                      height: 35,
                      fontSize: "12px",
                      backgroundColor: "#D9D9D9",
                      color: "#1e1e1e",
                      fontWeight: "700",
                      marginBottom: "2px",
                    }}
                  >
                    {passenger.id}
                  </Avatar>
                  <Box sx={{ fontSize: "12px" }}>
                    {waitedTimeParse(passenger.waitedTime ?? 120)}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "80%",
                  }}
                >
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
                        alignItems: "start",
                        width: "160px",
                        height:"100%"
                      }}
                    >
                      {passenger.nodeFrom ? (
                        <Box sx={{display:"flex", flexDirection:"column" }}>
                          <Typography fontSize={"16px"} fontWeight={800}>Origin: </Typography>
                          <Typography fontSize={"14px"}>{nodeName[passenger.nodeFrom]}</Typography>
                        </Box>
                      ) : (
                        <Box sx={{ fontSize: "20px" }}>-</Box>
                      )}

                      <Box sx={{ fontSize: "12px" }}>
                        Pick Time: {passenger.pickTime}
                      </Box>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent:"start",
                        width: "160px",
                        height:"100%"
                      }}
                    >
                      {passenger.nodeTo ? (
                        <Box sx={{display:"flex", flexDirection:"column" }}>
                        <Typography fontSize={"16px"} fontWeight={800}>Destination: </Typography>
                        <Typography fontSize={"14px"}>{nodeName[passenger.nodeTo]}</Typography>
                      </Box>
                      ) : (
                        <Box sx={{ fontSize: "20px" }}>-</Box>
                      )}
                      <Box sx={{ fontSize: "12px" }}>
                        Drop time: {passenger.dropTime}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
      </Box>
    </Slide>
  );
};

export default PassengersDetail;
