import { Box, Button, Typography } from "@mui/material";
import ExcelIcon from "./Icons/ExcelLogo";
import { uploadExcelFile } from "../Api/mapApi";
import { useDispatch } from "react-redux";
import { setExcelData } from "../Redux/excelDataSlice";
import { setLoading } from "../Redux/preloaderSlice";
import { setSliderValue } from "../Redux/timeSliderSlice";

const ImportForm = () => {
  const dispatch = useDispatch();
  const handleUploadFile = async (e) => {
    dispatch(setLoading(true));
    if (!e.target.files) {
      return;
    }
    const response = await uploadExcelFile(e.target.files[0]);
    dispatch(setExcelData(response));
    dispatch(setSliderValue(0));
    dispatch(setLoading(false));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "20%",
        color: "white",
        backgroundColor: "#1E1E1E",
        zIndex: 5000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "24px",
          fontWeight: "bold",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            fontStyle: "Italic",
          }}
        >
          Drag & Drop Microsoft Excel file here
        </Typography>
        <Typography sx={{ fontWeight: "bold", fontStyle: "Italic" }}>
          (XLSX or XLS){" "}
        </Typography>
      </Box>

      <form method="post" enctype="multipart/form-data">
        <Button
          variant="contained"
          component="label"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: "32px",
            cursor: "pointer",
            backgroundColor: "#D9D9D9",
            color: "#1E1E1E",
            padding: "8px",
          }}
        >
          <Box
            component="input"
            type="file"
            hidden
            name="excel_file"
            onChange={handleUploadFile}
          />
          <ExcelIcon />
          <Typography
            sx={{ fontSize: "18px", fontWeight: "700", marginLeft: "8px" }}
          >
            Select File
          </Typography>
        </Button>
      </form>
    </Box>
  );
};

export default ImportForm;
