import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import useDashboardStore from "../store/useDataStore";
import { IUser } from "../types/types";
import DeleteButton from "./DeleteRowButton";
import { Paper } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "username",
    headerName: "Identifiant",
    width: 200,
  },
  {
    field: "username", // The new column
    headerName: "Nom et Prénom",
    width: 200,
  },
  {
    field: "group",
    headerName: "Rang",
    width: 300,
  },
  {
    field: "email",
    headerName: "Adresse mail",
    width: 300,
  },
];

type UsersTableProps = {
  usersData: IUser[];
};

const UsersTable = ({ usersData }: UsersTableProps) => {
  const [filteredData, setFilteredData] = useState<IUser[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const { searchedValue } = useDashboardStore();

  const renderDeleteCell = () => {
    return <DeleteButton onClick={() => console.log("waiting")} />;
  };

  const handleSelectionChange = (selectionModel: number[]) => {
    if (selectionModel.length > 0) {
      setSelectedRows(selectionModel);
    } else {
      setSelectedRows([]);
    }
  };

  useEffect(() => {
    const searchedData = usersData.filter(
      (item) =>
        item.username === searchedValue ||
        item.first_name === searchedValue ||
        item.last_name === searchedValue ||
        item.email === searchedValue
    );

    setFilteredData(searchedValue !== "" ? searchedData : usersData);
  }, [searchedValue, usersData]);

  return (
    <Paper sx={{ width: "100%", height: "600px" }}>
      <DataGrid
        rows={filteredData}
        columns={[
          ...columns,
          {
            field: "delete",
            headerName: "Action",
            sortable: false,
            renderCell: renderDeleteCell,
          },
        ]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        components={{
          Toolbar: GridToolbar,
        }}
        autoHeight
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
      />

      {/* {selectedRows?.length > 0 ? (
        <Button className="deleteButton" onClick={deleteMultipleSelectedRows}>
          <DeleteIcon />
          <span>Supprimer tout les champs selectionné</span>
        </Button>
      ) : null} */}
    </Paper>
  );
};

export default UsersTable;
