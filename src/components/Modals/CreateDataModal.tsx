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
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextArea from "antd/es/input/TextArea";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
  // margin: 4,
  overflow: "auto",
};

type CreateDataModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateDataModal = ({ open, handleClose }: CreateDataModalProps) => {
  const availableRangs = [
    "administrateur",
    "externe",
    "moderateur",
    "interne",
    "gestion",
    "formation",
    "client",
  ];

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
          <Typography variant="subtitle1">Creation des données</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: 3,
              marginTop: 3,
            }}
          >
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              label="Code famille"
              name="code_famille"
            />
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              label="Code Identifiant"
              name="code_identifiant"
            />
            <TextArea rows={2} placeholder="Icons" />
            <TextArea rows={2} placeholder="Icons" />
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              label="Titre"
              name="Titre"
            />
            <Box sx={{ width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rang</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="Criteres"
                  // value={newUserData.group.toLocaleLowerCase()}
                  label="Criteres"
                  // onChange={handleNewUserDataChange}
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
              sx={{ width: "100%" }}
              label="Description"
              name="Description"
            />
            <TextArea rows={2} placeholder="Choix utilisateru..." />
            <TextArea rows={2} placeholder="Aide utilisateur..." />

            <TextArea rows={2} placeholder="Commentaire..." />
            <TextArea rows={2} placeholder="List des document" />
          </Box>
          <Button variant="outlined" sx={{ mt: 3, p: 1.5 }} fullWidth>
            + Créer
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateDataModal;
