import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { toast } from "react-toastify";
import { createNeed } from "../../api/Loaders";

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

type ModalTypes = {
  open: boolean;
  handleClose: () => void;
  fetchTableData: () => void;
};

export const NeedCreationModal = ({
  open,
  handleClose,
  fetchTableData,
}: ModalTypes) => {
  const [designation, setDesignation] = useState<string>("");

  const handleDesignationValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDesignation(event.target.value);
  };

  const createNewNeed = () => {
    if (designation === "") {
      toast.error("veuillez entrer une valeur de désignation");
    }

    createNeed(designation)
      .then((result) => {
        toast.success("Besoin créer avec success");
        handleClose();
        setDesignation("");
        // fetchTableData();
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
          <Typography variant="subtitle1">
            Désignation de l'expression de besoin à créer
          </Typography>
          <TextField
            variant="outlined"
            sx={{ width: "100%", marginTop: 3 }}
            label="Désignation"
            value={designation}
            onChange={handleDesignationValueChange}
          />
          <Button variant="outlined" sx={{ mt: 3 }} onClick={createNewNeed}>
            + Créer
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
