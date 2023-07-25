import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestOTP, userLogin } from "../../api/Loaders";
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
  const [emailChanged, setEmailChanged] = React.useState(false)
  const {is_authenticated} = useAuthState()


  const navigate = useNavigate();

  React.useEffect(() => {
    if (formData.email.length === 0){
      setEmailChanged(false)
    } 
    if (formData.password === ""){
      setDisabled(true)
    } 
    if (formData.email.length > 0) {
      setEmailChanged(true)
    } 
    if (formData.password.length > 0){
      setDisabled(false)
      setEmailChanged(false)
    }
    // if (formData.email === "" || formData.password === "") {
    //   setDisabled(true);
    //   if (formData.email.length === 0){
    //     setEmailChanged(false)
    //   }
    // }
    // else {
    //   setDisabled(false);
    // }
  }, [formData, formData.email.length, formData.password.length]);

  const handleLogin = () => {
    setIsLoading(true);
    userLogin({email: formData.email, otp: formData.password})
      .catch((err) => {
        console.log(err);
    }).finally(()=>{
      setIsLoading(false);
    })
  };

  const sendOTP = () => {
    setIsLoading(true);
    requestOTP(formData.email)
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
          onChange={(e) =>{
            setFormData((prevData) => ({
              ...prevData,
              email: e.target.value,
            }))
          }
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
          onChange={(e) =>{
            
            setFormData((prevData) => ({
              ...prevData,
              password: e.target.value,
            }))
          }}
        />

        <Grid container mt={2}>
          <Grid item xs={5}>
            <Button
              disabled={!emailChanged}
              variant="contained"
              onClick={sendOTP}
            >
              Demander OTP
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Typography></Typography>
          </Grid>

          <Grid item xs={5}>
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
