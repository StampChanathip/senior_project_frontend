import { Box, Avatar, Divider, Slide, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment/moment";
import { setIsShowStation } from "../Redux/stationDetailSlice";

const timeParse = (time) => {
  var m = Math.floor((time % 3600) / 60);
  var s = Math.floor((time % 3600) % 60);

  var mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " sec") : "";
  return mDisplay + sDisplay;
};

const ChargingStationDetail = () => {
  const dispatch = useDispatch();
  const { isShowStation, stationDetail, stationHistory } = useSelector(
    (state) => state.stationData
  );

  useEffect(() => {
    // console.log(isShowStation)
  }, [isShowStation])

  return (
    <Slide direction="left" in={isShowStation} mountOnEnter unmountOnExit>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          right: "0px",
          top: "0px",
          width: "360px",
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
            onClick={() => dispatch(setIsShowStation(false))}
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
          <Box sx={{ fontSize: "16px" }}>Station Detail</Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ fontSize: "14px" }}>
             Station No. {stationDetail.stationId}
            </Box>
          </Box>
        </Box>
        <Divider
          flexItem
          color={"#D9D9D9"}
          sx={{ marginBottom: "10px", marginTop: "4px" }}
        />

        {stationDetail.detail &&
          stationDetail.detail.map((station, idx) => {
            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginY: "6px",
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
                    
                  </Avatar>
                  <Box sx={{ fontSize: "12px" }}>
                    
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
                        minWidth: "130px",
                      }}
                    >
                     

                      <Box sx={{ fontSize: "12px" }}>
                        Pick Time:
                      </Box>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        minWidth: "130px",
                      }}
                    >
                      
                      <Box sx={{ fontSize: "12px" }}>
                        Drop time: 
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

export default ChargingStationDetail;
