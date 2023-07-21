import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../api/Loaders";
import useDashboardStore from "../../store/useDataStore";
import Loading from "../../components/spinner/Loading";
import { useAuthState } from "../../store/auth_store";
// import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #fff",
  boxShadow: 5,
  p: 4,
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 2,
};

interface userData {
  email: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = React.useState<userData>({
    email: "",
    password: "",
  });

  const [disabled, setDisabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const {is_authenticated} = useAuthState()
  const navigate = useNavigate();

  React.useEffect(() => {
    if (formData.email === "" || formData.password === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [formData]);

  const handleLogin = () => {
    setIsLoading(true);
    userLogin(formData)
      .catch((err) => {
        console.log(err);
    }).finally(()=>{
      setIsLoading(false);
    })
  };

  useEffect(() => {
    if (is_authenticated) {
      navigate("/dashboard/besoin");
    } else {
      //navigate("/");
    }
  }, [navigate, is_authenticated]);

  return (
    <Box sx={style}>
      {isLoading ? <Loading /> : null}
      <Box sx={formStyle}>
        <TextField
          sx={{
            marginTop: 1,
            marginBottom: 1,
            width: "100%",
          }}
          type="email"
          id="outlined-basic"
          label="Identifiant"
          variant="outlined"
          value={formData.email}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              email: e.target.value,
            }))
          }
        />
        <TextField
          sx={{
            marginTop: 1,
            marginBottom: 1,
            width: "100%",
          }}
          type="password"
          // id="outlined-basic"
          label="Mot de passe"
          variant="outlined"
          value={formData.password}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              password: e.target.value,
            }))
          }
        />

        <Grid container mt={2}>
          <Grid item xs>
            <Button variant="text" sx={{ outline: "none" }}>
              <Link to={"/password-restoration"} style={{ color: "#0096FF" }}>
                Mot de passe oublié ?
              </Link>
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Typography></Typography>
          </Grid>

          <Grid item>
            <Button
              disabled={disabled}
              variant="contained"
              onClick={handleLogin}
            >
              Se Connecter
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Login;
