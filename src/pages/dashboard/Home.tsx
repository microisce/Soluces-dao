import Topbar from "../../components/Topbar";
import CssBaseline from "@mui/material/CssBaseline";
import { SideBar } from "../../components/SideBar";
import Content from "../../components/Content";
import Box from "@mui/material/Box";

function Home() {
  return (
    <div style={{ position: "relative" }}>
      <CssBaseline />

      <Topbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "row",
          position: "relative",
        }}
      >
        <SideBar />
        <Content />
      </Box>
    </div>
  );
}

export default Home;
