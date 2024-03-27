import { Box, Avatar, Divider, Slide, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setIsShowPassenger } from "../Redux/passDetailSlice";

const waitedTimeParse = (time) => {
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
  return (
    <Slide direction="left" in={isShowPassenger} mountOnEnter unmountOnExit>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          right: "0px",
          top: "0px",
          width: "320px",
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
          <Box sx={{ fontSize: "14px" }}>
            Vehicle No. {passengerDetail.carId}
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
          <Box sx={{ fontSize: "12px", width: "72px", textAlign: "center" }}>
            Picking waited time
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "65%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingX: "16px",
              }}
            >
              <Box sx={{ fontSize: "14px" }}>Picking</Box>
              <Box sx={{ fontSize: "14px" }}>Dropping</Box>
            </Box>
            <Divider color={"#D9D9D9"} sx={{ marginTop: "4px" }} />
          </Box>
        </Box>
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
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "12px",
                    width: "72px",
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
                    width: "65%",
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
                        alignItems: "center",
                        minWidth: "90px",
                      }}
                    >
                      {passenger.nodeFrom ? (
                        <Box sx={{ fontSize: "14px" }}>
                          {passenger.nodeFrom}
                        </Box>
                      ) : (
                        <Box sx={{ fontSize: "20px" }}>-</Box>
                      )}

                      <Box sx={{ fontSize: "14px" }}>
                        {passenger.departTime}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: "90px",
                      }}
                    >
                      {passenger.nodeTo ? (
                        <Box sx={{ fontSize: "14px" }}>{passenger.nodeTo}</Box>
                      ) : (
                        <Box sx={{ fontSize: "20px" }}>-</Box>
                      )}
                      <Box sx={{ fontSize: "14px" }}>
                        {passenger.arriveTime}
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
