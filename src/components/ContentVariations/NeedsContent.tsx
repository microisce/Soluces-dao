import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import useDashboardStore from "../../store/useDataStore";
import { DataType } from "../../types/types";
import { getNeedsData } from "../../api/Loaders";
import { ContentStyle } from "../../pages/dashboard/styles";
import { NeedCreationModal } from "../Modals/CreateNeedModal";
import FilterButton from "../FilterButton";
import NeedsTable from "../NeedsTable";

const NeedsContent = () => {
  const { setSearchedValue } = useDashboardStore();

  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearchChange = (value: string) => {
    setSearchedValue(value);
  };

  const fetchTableData = () => {
    getNeedsData()
      .then((result) => {
        setTableData(result);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <Box sx={ContentStyle.container}>
      <NeedCreationModal {...{ open, handleClose, fetchTableData }} />
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
        <NeedsTable data={tableData} fetchData={fetchTableData} />
      </Box>
    </Box>
  );
};

export default NeedsContent;
