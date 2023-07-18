import Box from "@mui/material/Box";
import { ContentStyle } from "../pages/dashboard/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FilterButton from "./FilterButton";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "./DataTable";
import useDashboardStore from "../store/useDataStore";
import { Link, useLocation } from "react-router-dom";
import Create from "../pages/dashboard/create/Create";
import { useState } from "react";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createNeed } from "../api/Loaders";
import { toast } from "react-toastify";

// type Props = {}

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
};

const NeedCreationModal = ({ open, handleClose }: ModalTypes) => {
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
        if (result === 201) {
          toast.success("Besoin créer avec success");
          handleClose();
          setDesignation("");
        }
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

export const Needs = () => {
  const { setSearchedValue } = useDashboardStore();
  // const location = useLocation();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearchChange = (value: string) => {
    setSearchedValue(value);
  };

  return (
    <Box sx={ContentStyle.container}>
      <NeedCreationModal {...{ open, handleClose }} />
      <Box sx={ContentStyle.header}>
        <Typography variant="h4">Expression de besoin</Typography>
        <Button
          variant="outlined"
          sx={ContentStyle.createButton}
          onClick={handleOpen}
        >
          + Créer
        </Button>
      </Box>
      <Box sx={ContentStyle.filtersContainer}>
        <Box sx={ContentStyle.searchField}>
          <SearchIcon
            sx={{
              position: "absolute",
              left: 10,
              right: 0,
              top: 10,
              bottom: 0,
              color: "#7e7e7e",
            }}
          />
          <TextField
            variant="outlined"
            placeholder="Rechercher..."
            sx={ContentStyle.searchInput}
            inputProps={{
              style: {
                height: 10,
                paddingLeft: 40,
              },
            }}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
        </Box>
        <FilterButton />
      </Box>
      <Box sx={{ mt: 5 }}>
        <DataTable />
      </Box>
    </Box>
  );
};

const Content = () => {
  const location = useLocation();
  if (location.pathname === "/dashboard/besoin") {
    return <Needs />;
  } else if (location.pathname === "/dashboard/create") {
    return <Create />;
  }
};

export default Content;
