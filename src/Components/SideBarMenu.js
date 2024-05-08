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
  Button,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { useSelector } from "react-redux";
import { useState } from "react";
import ImportDialog from "./ImportDialog";
import { Link } from "react-router-dom";

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { excelData } = useSelector((state) => state.excelData);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return excelData.length === 0 ? (
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
          (XLSX or XLS)
        </Typography>
      </Box>
      <Button
        variant="contained"
        component="label"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: "32px",
          cursor: "pointer",
          paddingY: "10px",
          paddingX: "32px",
        }}
        onClick={() => setDialogOpen(true)}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
          Upload file
        </Typography>
      </Button>
      <ImportDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
      />
    </Box>
  ) : (
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
          ...(drawerOpen && { display: "none" }),
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
        open={drawerOpen}
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
              onClick={() => setDialogOpen(true)}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                color: "white",
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <FileUploadIcon />
              </ListItemIcon>
              <ListItemText primary={"Upload New File"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Tool & Dashboard"} disablePadding>
            <ListItemButton  sx={{display: "flex", flexDirection:"row", width:"180px"}}>
              <Link to="/dashboard" style={{ textDecoration: 'none', display:"flex", flexDirection:"row" }}>
                <ListItemIcon sx={{ color: "white" }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={"Tool & Dashboard"} />
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
        <ImportDialog
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
        />
      </Drawer>
    </Box>
  );
};

export default SideBarMenu;
