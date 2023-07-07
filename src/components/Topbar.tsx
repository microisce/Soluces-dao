import React from "react";
import SDLogo from "../assets/SD-LOGO.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { topBarStyle } from "../pages/dashboard/styles";
// type Props = {}

const Topbar = () => {
  return (
    <Box sx={topBarStyle.container}>
      <Box sx={topBarStyle.LogoAndUserContainer}>
        <img
          src={SDLogo}
          alt="main_logo"
          width={200}
          height={50}
          style={{ border: "1px solid #000", margin: 10 }}
        />
        <Typography variant="h5">Bonjour Mr TAZAIRT Riad</Typography>
      </Box>
      <Typography variant="h5" sx={{ pr: 10 }}>
        RIT ADMIN
      </Typography>
    </Box>
  );
};

export default Topbar;
