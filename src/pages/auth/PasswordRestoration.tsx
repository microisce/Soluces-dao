import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

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

const PasswordRestoration = () => {
  const [email, setEmail] = React.useState("");

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6">
        Restaurez votre mot de passe
      </Typography>
      <Typography id="modal-modal-description" variant="subtitle1">
        Entrez votre e-mail pour recevoir le lien de restauration
      </Typography>
      <TextField
        sx={{
          marginTop: 2,
          marginBottom: 1,
          width: "100%",
        }}
        id="outlined-basic"
        label="E-mail"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Button variant="outlined" onClick={close}>
          <Link to={"/"} style={{ color: "#0096FF" }}>
            Retour
          </Link>
        </Button>
        <Button
          disabled={email === ""}
          variant="contained"
          // onClick={sendRestorationEmail}
        >
          Restaurer le mot de passe
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordRestoration;
