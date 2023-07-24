import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ContentStyle } from "../../pages/dashboard/styles";
import SearchIcon from "@mui/icons-material/Search";
import DataBaseTable from "../tables/DataBaseTable";
import CreateDataModal from "../Modals/CreateDataModal";

const DataBaseView = () => {
  const [open, setOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={ContentStyle.container}>
      <CreateDataModal {...{ open, handleClose }} />
      <Box sx={ContentStyle.header}>
        <Typography variant="h4">Base de données</Typography>
        <Button
          variant="outlined"
          sx={ContentStyle.createButton}
          onClick={handleOpen}
        >
          + Créer
        </Button>
      </Box>
      <Box sx={{ mt: 5 }}>
        <DataBaseTable />
      </Box>
    </Box>
  );
};

export default DataBaseView;
