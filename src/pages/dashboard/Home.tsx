import Topbar from "../../components/Topbar";
import CssBaseline from "@mui/material/CssBaseline";
import { SideBar } from "../../components/SideBar";
import Content from "../../components/Content";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import useDashboardStore from "../../store/useDataStore";
import { getUser } from "../../api/Loaders";
import { IUser } from "../../types/types";
import { useNavigate } from "react-router-dom";
// import useDashboardStore from "../../store/useDataStore";
// import { getUser } from "../../api/Loaders";
// import { IUser } from "../../types/types";

function Home() {
  const [user, setUser] = useState<IUser>();
  const setToken = useDashboardStore((v) => v.setToken);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token") as string;

  useEffect(() => {
    setToken(token);
    getUser(token)
      .then((response) => {
        setUser(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setToken]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <div style={{ position: "relative" }}>
      <CssBaseline />

      <Topbar user={user as IUser} clearToken={setToken} />
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
