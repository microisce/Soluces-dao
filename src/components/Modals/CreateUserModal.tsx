import {
  Box,
  Button,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { NewUserType } from "../../types/types";
import { createNewUser } from "../../api/Loaders";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

type CreateUserModalTypes = {
  open: boolean;
  handleClose: () => void;
  fetchUsers: () => void;
};

const CreateUserModal = ({
  open,
  handleClose,
  fetchUsers,
}: CreateUserModalTypes) => {
  const [newUserData, setNewUserData] = useState<NewUserType>({
    first_name: "",
    last_name: "",
    group: "",
    email: "",
  });

  const token: string | null = localStorage.getItem("access_token");

  const availableRangs = [
    "administrateur",
    "externe",
    "moderateur",
    "interne",
    "gestion",
    "formation",
    "client",
  ];

  const handleNewUserDataChange = (e: {
    target: { name: string; value: string };
  }) => {
    setNewUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUserCreation = () => {
    if (token) {
      createNewUser(newUserData)
        .then(() => {
          toast.success("utilisateur creér avec success");
            fetchUsers();
            handleClose();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            variant="text"
            sx={{ position: "absolute", right: 20, top: 20, color: "red" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
          <Typography variant="subtitle1">Creation d'utilisateur</Typography>
          <Box>
            <TextField
              variant="outlined"
              sx={{ width: "100%", marginTop: 3 }}
              label="Nom"
              name="last_name"
              value={newUserData.last_name}
              onChange={handleNewUserDataChange}
            />
            <TextField
              variant="outlined"
              sx={{ width: "100%", marginTop: 3 }}
              label="Prénom"
              name="first_name"
              value={newUserData.first_name}
              onChange={handleNewUserDataChange}
            />
            <Box sx={{ mt: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rang</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="group"
                  value={newUserData.group.toLocaleLowerCase()}
                  label="Group"
                  onChange={handleNewUserDataChange}
                >
                  {availableRangs.map((rang, index) => (
                    <MenuItem key={index} value={rang}>
                      {rang.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              variant="outlined"
              sx={{ width: "100%", marginTop: 3 }}
              label="Addresse mail"
              name="email"
              value={newUserData.email}
              onChange={handleNewUserDataChange}
            />
          </Box>
          <Button
            variant="outlined"
            sx={{ mt: 3, p: 1.5 }}
            fullWidth
            onClick={handleUserCreation}
          >
            + Créer utilisateur
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateUserModal;
