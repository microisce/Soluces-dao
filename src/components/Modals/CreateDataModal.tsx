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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DataBaseTypes } from "../../types/types";
import { useEffect, useState } from "react";
import { getTypesList } from "../../api/Loaders";
import { StyledTextarea, style } from "./styles";

type CreateDataModalProps = {
  open: boolean;
  handleClose: () => void;
  createData: (data: DataBaseTypes) => void;
};

const initialValues = {
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
  help_documents: "",
  complexity_point: "",
  rights: "",
};

const ComplexityPoints: string[] = ["simple", "moyen", "complexe", "hors bord"];
const COMPLEXITY_MAPPING = {} as any;

for (let i = 0; i < ComplexityPoints.length; i++) {
  COMPLEXITY_MAPPING[ComplexityPoints[i]] = i + 1;
}

const availableRights: string[] = [
  "administrateur",
  "externe",
  "moderateur",
  "interne",
  "gestion",
  "formation",
  "client",
];

const CreateDataModal = ({
  open,
  handleClose,
  createData,
}: CreateDataModalProps) => {
  const [data, setData] = useState<DataBaseTypes>(initialValues);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedList, setSelectedList] = useState<string[]>([]);

  const fetchTypes = () => {
    getTypesList()
      .then((data) => {
        setTypes(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleValuesChange = (e: {
    target: { name: string; value: string };
  }) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRightsChange = (event: SelectChangeEvent<typeof data.rights>) => {
    const {
      target: { value },
    } = event;

    setSelectedList(typeof value === "string" ? value.split(",") : value);
  };

  const submitData = () => {
    const copied_data = {
      ...data,
    };
    copied_data["complexity_point"] =
      COMPLEXITY_MAPPING[data.complexity_point.toLowerCase()];
    createData(copied_data);
    setData(initialValues);
  };

  useEffect(() => {
    if (selectedList.length > 0) {
      setData((prevData) => ({
        ...prevData,
        rights: selectedList.join(";"),
      }));
    }

    console.log(data.rights);
  }, [selectedList, data.rights]);

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
            <TextField
              variant="outlined"
              sx={{ width: "100%" }}
              label="Icon"
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
              label="Déscription"
              name="description"
              value={data.description}
              onChange={handleValuesChange}
            />

            <StyledTextarea
              aria-label="minimum height"
              minRows={3}
              placeholder="Fichiers..."
              name="file"
              value={data.file}
              onChange={handleValuesChange}
            />
            <Box sx={{ width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Liste de critères
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="item"
                  value={data.item}
                  label="Liste de critères"
                  onChange={handleValuesChange}
                >
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <StyledTextarea
              aria-label="minimum height"
              minRows={3}
              placeholder="Condition..."
              name="condition"
              value={data.condition}
              onChange={handleValuesChange}
            />

            <StyledTextarea
              aria-label="minimum height"
              minRows={3}
              placeholder="Aide utilisateur..."
              name="help"
              value={data.help}
              onChange={handleValuesChange}
            />

            <StyledTextarea
              aria-label="minimum height"
              minRows={3}
              placeholder="Commentaire..."
              name="comment"
              value={data.comment}
              onChange={handleValuesChange}
            />

            <StyledTextarea
              aria-label="minimum height"
              minRows={3}
              placeholder="Documents utils"
              name="help_documents"
              value={data.help_documents}
              onChange={handleValuesChange}
            />

            <Box sx={{ width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Point de complexité
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="complexity_point"
                  value={data.complexity_point}
                  label="Point de complexité"
                  onChange={handleValuesChange}
                >
                  {ComplexityPoints.map((point, index) => (
                    <MenuItem key={index} value={point}>
                      {point.toLocaleUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Droit d'utilisateur
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  multiple
                  name="complexity_point"
                  value={selectedList}
                  label="Droit d'utilisateur"
                  onChange={handleRightsChange}
                >
                  {availableRights.map((right) => (
                    <MenuItem key={right} value={right}>
                      {right.toLocaleUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
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
