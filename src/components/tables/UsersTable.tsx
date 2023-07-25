import { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  frFR,
  gridExpandedSortedRowIdsSelector,
  gridVisibleColumnDefinitionsSelector,
  useGridApiRef,
} from "@mui/x-data-grid";
import useDashboardStore from "../../store/useDataStore";
import { IUser } from "../../types/types";
import DeleteButton from "../DeleteRowButton";
import { Button, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUser } from "../../api/Loaders";

const columns: GridColDef[] = [
  {
    field: "username",
    headerName: "Identifiant",
    flex: 1,
  },
  {
    field: "Nom et Prénom",
    headerName: "Nom et Prénom",
    valueGetter: ({ row }) => `${row.first_name} ${row.last_name}`,
    flex: 1,
  },
  {
    field: "group",
    headerName: "Rang",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Adresse mail",
    flex: 1,
  },
];

type UsersTableProps = {
  usersData: IUser[] | undefined;
};

const UsersTable = ({ usersData }: UsersTableProps) => {
  const [filteredData, setFilteredData] = useState<IUser[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const { searchedValue } = useDashboardStore();

  const renderDeleteCell = (params: { row: { id: number } }) => {
    const handleDeleteClick = () => {
      const rowId = params.row.id;
      deleteUser(rowId)
        .then((data) => {
          setFilteredData(data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return <DeleteButton onClick={handleDeleteClick} />;
  };

  const deleteMultipleSelectedRows = () => {
    selectedRows.forEach((rowId: number) => {
      deleteUser(rowId)
        .then((data) => {
          setFilteredData(data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const handleSelectionChange = (selectionModel: number[]) => {
    if (selectionModel.length > 0) {
      setSelectedRows(selectionModel);
    } else {
      setSelectedRows([]);
    }
  };

  useEffect(() => {
    if (usersData?.length > 0) {
      const searchedData = usersData?.filter(
        (item) =>
          item.username === searchedValue ||
          item.first_name === searchedValue ||
          item.last_name === searchedValue ||
          item.email === searchedValue
      );

      setFilteredData(searchedValue !== "" ? searchedData : usersData);
    } else {
      setFilteredData([]);
    }
  }, [searchedValue, usersData]);

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
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
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleSelectionChange}
      />

      {selectedRows?.length > 0 ? (
        <Button className="deleteButton" onClick={deleteMultipleSelectedRows}>
          <DeleteIcon />
          <span>Supprimer tout les champs selectionné</span>
        </Button>
      ) : null}
    </Paper>
  );
};

export default UsersTable;
