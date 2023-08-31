import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ContentStyle } from "../../pages/dashboard/styles";
import SearchIcon from "@mui/icons-material/Search";
import DataBaseTable from "../tables/DataBaseTable";
// import CreateDataModal from "../Modals/CreateDataModal";
import { DataBaseType, Step } from "../../types/types";
import { createDataForDB } from "../../api/Loaders";
import CreateDataModal from "../Modals/CreateDataModal";

const DataBaseView = () => {
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState<DataBaseType[]>([]);
  const [initial, setInitial] = useState<DataBaseType>({} as DataBaseType)
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setInitial({} as DataBaseType)
  }

  async function createData(data: Step) {
    console.log(data)
    try {
      const response = await createDataForDB(data)
      setTableData(response);
      return Promise.resolve(true)
    } catch (e){
      console.error(e)
      return Promise.resolve(false)
    } 
  }

  console.log(tableData)

  return (
    <Box sx={ContentStyle.container}>
      {
        open ? <CreateDataModal  open={open} onClose={handleClose} createData={createData} initial={initial} /> : null
      }
      
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
        <DataBaseTable tableData={tableData} onEdit={(row)=>{setInitial(row); setOpen(true); console.log("INITIAL", row)}}  />
      </Box>
    </Box>
  );
};

export default DataBaseView;
