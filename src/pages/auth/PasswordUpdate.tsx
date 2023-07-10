import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 5,
  shadowColor: "#7e7e7e",
  p: 4,
};
// type Props = ;

const PasswordUpdate = () => {
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    React.useState("");

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6">
        Changer votre mot de passe
      </Typography>

      <TextField
        sx={{
          marginTop: 2,
          marginBottom: 1,
          width: "100%",
        }}
        id="outlined-basic"
        label="Nouveau mot de passe"
        variant="outlined"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <TextField
        sx={{
          marginTop: 2,
          marginBottom: 1,
          width: "100%",
        }}
        id="outlined-basic"
        label="Confirmer le nouveau mot de passe"
        variant="outlined"
        value={newPasswordConfirmation}
        onChange={(e) => setNewPasswordConfirmation(e.target.value)}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Button
          disabled={newPassword === "" || newPasswordConfirmation === ""}
          variant="contained"
          // onClick={sendRestorationEmail}
        >
          Changer mot de passe
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordUpdate;
