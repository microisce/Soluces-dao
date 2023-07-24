import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import CreateUserModal from "../Modals/CreateUserModal";
import useDashboardStore from "../../store/useDataStore";
import { ContentStyle } from "../../pages/dashboard/styles";
import UsersTable from "../tables/UsersTable";
import { getAllUsers } from "../../api/Loaders";
import { IUser } from "../../types/types";

const AdminConsole = () => {
  const [open, setOpen] = useState(false);
  const [usersData, setUserData] = useState<IUser[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { setSearchedValue } = useDashboardStore();

  const handleSearchChange = (value: string) => {
    setSearchedValue(value);
  };

  const fetchUsers = () => {
    getAllUsers()
      .then((result) => {
        setUserData(result.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box sx={ContentStyle.container}>
      <CreateUserModal {...{ open, handleClose, fetchUsers }} />
      <Box sx={ContentStyle.header}>
        <Typography variant="h4">Console administrateur</Typography>
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
      </Box>
      <Box sx={{ mt: 5 }}>
        <UsersTable usersData={usersData} />
      </Box>
    </Box>
  );
};

export default AdminConsole;
