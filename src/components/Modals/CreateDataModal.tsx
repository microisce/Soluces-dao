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
import { DataBaseTypes } from "../../types/types";
import { useState } from "react";

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
  const [data, setData] = useState<DataBaseTypes>({
    family_code: "",
    id_code: "",
    icon: "",
    title: "",
    description: "",
    file: "",
    item: "",
    condition: "",
    help: "",
    comment: "",
    document: "",
    complexity: "",
    right: "",
  });

  const availableRangs = [
    "administrateur",
    "externe",
    "moderateur",
    "interne",
    "gestion",
    "formation",
    "client",
  ];

  const handleValuesChange = (e: {
    target: { name: string; value: string };
  }) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitData = () => {
    console.log(data);
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
              name="family_code"
              value={data.family_code}
              onChange={handleValuesChange}
            />
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              label="Code Identifiant"
              name="id_code"
              value={data.id_code}
              onChange={handleValuesChange}
            />
            <TextArea
              rows={2}
              placeholder="Icons"
              name="icon"
              value={data.icon}
              onChange={handleValuesChange}
            />
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              label="Titre"
              name="title"
              value={data.title}
              onChange={handleValuesChange}
            />
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              label="Description"
              name="description"
              value={data.description}
              onChange={handleValuesChange}
            />
            <TextArea
              rows={2}
              placeholder="Files..."
              name="file"
              value={data.file}
              onChange={handleValuesChange}
            />
            <Box sx={{ width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Criteres</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="item"
                  value={data.item}
                  // value={newUserData.group.toLocaleLowerCase()}
                  label="Criteres"
                  onChange={handleValuesChange}
                >
                  {availableRangs.map((rang, index) => (
                    <MenuItem key={index} value={rang}>
                      {rang.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <TextArea
              rows={2}
              placeholder="Choix utilisateur..."
              name="condition"
              value={data.condition}
              onChange={handleValuesChange}
            />
            <TextArea
              rows={2}
              placeholder="Aide utilisateur..."
              name="help"
              value={data.help.toUpperCase()}
              onChange={handleValuesChange}
            />

            <TextArea
              rows={2}
              placeholder="Commentaire..."
              name="comment"
              value={data.comment}
              onChange={handleValuesChange}
            />
            <TextArea
              rows={2}
              placeholder="List des document"
              name="document"
              value={data.document}
              onChange={handleValuesChange}
            />
          </Box>
          <Button
            variant="outlined"
            sx={{ mt: 3, p: 1.5 }}
            fullWidth
            onClick={submitData}
          >
            + Créer
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateDataModal;
