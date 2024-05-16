import { Box, Typography } from "@mui/material";
const NoFileText = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "64px",
          fontWeight: "900",
          textAlign: "center",
          fontStyle: "Italic",
          marginBottom: "48px",
        }}
      >
        NO FILE HERE BRO
      </Typography>
      <Box
        component="img"
        src="Assets/Icon/Sad_Face.png"
        sx={{ width: "256px" }}
      />
    </Box>
  );
};

export default NoFileText;
