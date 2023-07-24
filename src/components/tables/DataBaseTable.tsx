import { useState } from "react";
import { DataGrid, GridColDef, GridToolbar, frFR } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "family_code",
    headerName: "code famille",
    flex: 1,
  },
  { field: "id_code", headerName: "code identifiant", flex: 1 },
  { field: "icon", headerName: "Icon", flex: 1 },
  {
    field: "title",
    headerName: "titre",
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
  },
  {
    field: "file",
    headerName: "File",
    flex: 1,
  },
  {
    field: "items",
    headerName: "Critéres",
    flex: 1,
  },
  {
    field: "conditions",
    headerName: "choix utilisateur",
    flex: 1,
  },
  {
    field: "help",
    headerName: "Aide utilisateur",
    flex: 1,
  },
  {
    field: "comment",
    headerName: "commentaire",
    flex: 1,
  },
  {
    field: "documents",
    headerName: "List des documents",
    flex: 1,
  },
  {
    field: "complexity",
    headerName: "Point de complexité",
    flex: 1,
  },
  {
    field: "rights",
    headerName: "Droit utilisateur",
    flex: 1,
  },
];

const initial = {} as any;
for (const item of columns) {
  initial[item.field] = item.headerName;
}

const DataBaseTable = () => {
  // Sample data for demonstration purposes
  // const initialData = [
  //   { id: 1, code_fa: "Value 1", B: "Value 2", C: "Value 3" /* ... */ },
  //   { id: 2, A: "Value 4", B: "Value 5", C: "Value 6" /* ... */ },
  //   // Add more rows as needed
  // ];

  const [filteredData, setFilteredData] = useState([initial]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Define the deleteMultipleSelectedRows function if needed
  const deleteMultipleSelectedRows = () => {
    // Implement the logic to delete selected rows here
  };

  return (
    <div style={{ position: "relative" }}>
      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        rows={filteredData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        getRowId={(item) => item}
        pageSizeOptions={[5, 10]}
        components={{
          Toolbar: GridToolbar,
        }}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{ overflowX: "auto" }}

        // onRowSelectionModelChange={handleSelectionChange}
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

export default DataBaseTable;
