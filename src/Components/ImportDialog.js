import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ExcelIcon from "./Icons/ExcelLogo";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { uploadExcelFile } from "../Api/mapApi";
import { useDispatch } from "react-redux";
import { setExcelData } from "../Redux/excelDataSlice";
import { setLoading } from "../Redux/preloaderSlice";
import { setSliderValue } from "../Redux/timeSliderSlice";

export default function ImportDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState("");
  const importForm = useForm();
  const { register, handleSubmit } = importForm;

  const submitForm = async (formData) => {
    dispatch(setLoading(true));
    console.log(formData["excel_file"][0]);

    const response = await uploadExcelFile(formData["excel_file"][0]);
    dispatch(setExcelData(response));
    dispatch(setSliderValue(0));
    dispatch(setLoading(false));
    handleClose();
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ zIndex: 6000 }}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(submitForm),
        }}
      >
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", rowGap: "22px" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              columnGap: "12px",
              rowGap: "12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "12px",
                width: "320px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ width: "200px" }}>
                  Number of Vehicles
                </Typography>
                <TextField
                  sx={{ width: "64px" }}
                  defaultValue={20}
                  {...register("Vehicle Number", { valueAsNumber: true })}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ width: "200px" }}>
                  Number of Charging Station
                </Typography>
                <TextField
                  sx={{ width: "64px" }}
                  defaultValue={3}
                  {...register("Charge Staion Number", { valueAsNumber: true })}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Number of Charging Slot</Typography>
                <TextField
                  sx={{ width: "64px" }}
                  defaultValue={0}
                  {...register("Charge Slot Number", { valueAsNumber: true })}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "12px",
                width: "320px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ width: "200px" }}>
                  Number of Passenger
                </Typography>
                <TextField
                  sx={{ width: "64px" }}
                  defaultValue={6}
                  {...register("Passenger Number", { valueAsNumber: true })}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ width: "200px" }}>Number of Node</Typography>
                <TextField
                  sx={{ width: "64px" }}
                  defaultValue={0}
                  {...register("Node Number", { valueAsNumber: true })}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Max waiting time</Typography>
                <TextField
                  sx={{ width: "64px" }}
                  defaultValue={5}
                  type="number"
                  {...register("Max wait time", { valueAsNumber: true })}
                />
              </Box>
            </Box>
          </Box>
          {selectedFile.length !== 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "24px",
              }}
            >
              <Typography fontSize={22}>
                Selected File: {selectedFile}
              </Typography>
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
                  {...register("excel_file", {
                    onChange: (e) => setSelectedFile(e.target.files[0].name),
                  })}
                />
                <ExcelIcon />
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    marginLeft: "8px",
                  }}
                >
                  Select New File
                </Typography>
              </Button>
            </Box>
          ) : (
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
                {...register("excel_file", {
                  onChange: (e) => setSelectedFile(e.target.files[0].name),
                })}
              />
              <ExcelIcon />
              <Typography
                sx={{ fontSize: "18px", fontWeight: "700", marginLeft: "8px" }}
              >
                Select File
              </Typography>
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
