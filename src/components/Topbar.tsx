import SDLogo from "../assets/SD-LOGO.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { topBarStyle } from "../pages/dashboard/styles";
import { IAuth } from "../types/types";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type TopBarProps = {
  user: IAuth;
  clearToken: (value: string) => void;
};

const TopBar = ({ user, clearToken }: TopBarProps) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    clearToken("");
    navigate("/");
    toast.success("Logout successfully");
  };

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
        <Typography variant="h5">
          Bonjour Mr {user?.first_name} {user?.last_name}
        </Typography>
      </Box>
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          pr: 10,
        }}
      >
        <Typography variant="h5" sx={{ mr: 5 }}>
          RIT ADMIN
        </Typography>
        <Button variant="text" onClick={handleLogOut}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default TopBar;
