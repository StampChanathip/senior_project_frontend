import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { uploadExcelFile } from "../Api/mapApi";

import { useDispatch } from "react-redux";
import { setExcelData } from "../Redux/excelDataSlice";
import { setLoading } from "../Redux/preloaderSlice";
import { setSliderValue } from "../Redux/timeSliderSlice";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SideBarMenu = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleUploadFile = async (e) => {
    console.log("upload");
    dispatch(setLoading(true));
    if (!e.target.files) {
      return;
    }
    const response = await uploadExcelFile(e.target.files[0]);
    dispatch(setExcelData(response));
    dispatch(setSliderValue(0));
    dispatch(setLoading(false));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        height: "100vh",
        width: "56px",
        backgroundColor: "#1E1E1E",
        zIndex: 5000,
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          ...(open && { display: "none" }),
          color: "white",
          width: "100%",
          margin: "0px",
        }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1E1E1E",
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={"Upload File"} disablePadding>
            <ListItemButton
              variant="contained"
              component="label"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                color: "white",
              }}
            >
              <Box
                component="input"
                type="file"
                hidden
                name="excel_file"
                onChange={handleUploadFile}
              />
              <ListItemIcon sx={{ color: "white" }}>
                <FileUploadIcon />
              </ListItemIcon>
              <ListItemText primary={"Upload New File"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Tool & Dashboard"} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={"Tool & Dashboard"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBarMenu;
