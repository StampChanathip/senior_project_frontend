import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoading } from "../Redux/preloaderSlice";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const ScreenWrapper = ({ children }) => {
  const { isLoading } = useSelector((state) => state.preloader);
  const dispatch = useDispatch();

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: 10000 }}
        open={isLoading}
        onClick={() => dispatch(setLoading(false))}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </Box>
  );
};

export default ScreenWrapper;
