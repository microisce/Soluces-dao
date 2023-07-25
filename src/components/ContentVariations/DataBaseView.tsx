import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ContentStyle } from "../../pages/dashboard/styles";
import SearchIcon from "@mui/icons-material/Search";
import DataBaseTable from "../tables/DataBaseTable";
// import CreateDataModal from "../Modals/CreateDataModal";
import { DataBaseTypes } from "../../types/types";
import { createDataForDB } from "../../api/Loaders";
import CreateDataModal from "../Modals/CreateDataModal";

const DataBaseView = () => {
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState<DataBaseTypes[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function createData(data: DataBaseTypes) {
    createDataForDB(data)
      .then((response) => {
        setTableData(response);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Box sx={ContentStyle.container}>
      <CreateDataModal {...{ open, handleClose, createData }} />
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
        <DataBaseTable tableData={tableData} />
      </Box>
    </Box>
  );
};

export default DataBaseView;
