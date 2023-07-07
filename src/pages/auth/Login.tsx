import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { userLogin } from "../../api/loaders";

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

  React.useEffect(() => {
    if (formData.email === "" || formData.password === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [formData]);

  const handleLogin = () => {
    userLogin(formData.email, formData.password)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={style}>
      <Box sx={formStyle}>
        <TextField
          sx={{
            marginTop: 1,
            marginBottom: 1,
            width: "100%",
          }}
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
          type="Mot de passe"
          id="outlined-basic"
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
