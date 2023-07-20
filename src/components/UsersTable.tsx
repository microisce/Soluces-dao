import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import useDashboardStore from "../store/useDataStore";
import { DataType, IUser } from "../types/types";
import DeleteButton from "./DeleteRowButton";
// import { toast } from "react-toastify";
// import DeleteButton from "./DeleteRowButton";
// import { Button, Tooltip } from "antd";
// import DeleteIcon from "@mui/icons-material/Delete";
// import moment from "moment";

const columns: GridColDef[] = [
  {
    field: "username",
    headerName: "Identifiant",
    width: 200,
  },
  {
    field: "fullName", // The new column
    headerName: "Full Name",
    width: 200,
    valueGetter: (params) =>
      `${params.row.first_name || ""} ${params.row.last_name || ""}`,
  },
  {
    field: "rang",
    headerName: "Rang",
    width: 300,
  },
  {
    field: "email",
    headerName: "Adresse mail",
    width: 300,
  },
];

// type TableDataProp = {};

const data: IUser[] = [];

for (let i = 0; i < 20; i++) {
  data.push({
    id: i,
    first_name: "oussama",
    last_name: "chahidi",
    username: `OUS${i}`,
    rang: "administrateur",
    email: `oussama200${i}@gmail.com`,
  });
}

const UsersTable = () => {
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
    const searchedData = data.filter(
      (item) =>
        item.username === searchedValue ||
        item.first_name === searchedValue ||
        item.last_name === searchedValue ||
        item.email === searchedValue
    );

    setFilteredData(searchedValue !== "" ? searchedData : data);
  }, [searchedValue]);

  // useEffect(() => {
  //   console.log(selectedRows);
  // }, [selectedRows]);

  return (
    <div style={{ position: "relative" }}>
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
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
      />

      {/* {selectedRows?.length > 0 ? (
        <Button className="deleteButton" onClick={deleteMultipleSelectedRows}>
          <DeleteIcon />
          <span>Supprimer tout les champs selectionné</span>
        </Button>
      ) : null} */}
    </div>
  );
};

export default UsersTable;
