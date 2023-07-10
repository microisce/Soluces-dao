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
import { useEffect } from "react";

// type Props = {}

export const Needs = () => {
  const { setSearchedValue } = useDashboardStore();
  // const location = useLocation();

  const handleSearchChange = (value: string) => {
    setSearchedValue(value);
  };

  const token = useDashboardStore((v) => v.token);

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <Box sx={ContentStyle.container}>
      <Box sx={ContentStyle.header}>
        <Typography variant="h4">Expression de besoin</Typography>
        <Button variant="outlined" sx={ContentStyle.createButton}>
          <Link
            to={`/dashboard/create`}
            style={{ textDecoration: "none", color: "#007FFF" }}
          >
            + Créer
          </Link>
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
