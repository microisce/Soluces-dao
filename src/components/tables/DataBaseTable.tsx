import { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef, GridToolbar, frFR } from "@mui/x-data-grid";
import { Button, Card } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const columns: GridColDef[] = [
  {
    field: "family_code",
    headerName: "code famille",
    flex: 1.5,
  },
  { field: "id_code", headerName: "code identifiant", flex: 2 },
  { field: "icon", headerName: "Icon", flex: 1 },
  {
    field: "title",
    headerName: "titre",
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 2,
  },
  {
    field: "attachment",
    headerName: "File",
    flex: 1,
  },
  {
    field: "items_type",
    headerName: "Critéres",
    flex: 1,
  },
  {
    field: "conditions",
    headerName: "choix utilisateur",
    flex: 2,
  },
  {
    field: "user_help",
    headerName: "Aide utilisateur",
    flex: 2,
  },
  {
    field: "comment",
    headerName: "commentaire",
    flex: 2,
  },
  {
    field: "help_documents",
    headerName: "List des documents",
    flex: 2.5,
  },
  {
    field: "complexity",
    headerName: "Point de complexité",
    flex: 2.5,
  },
  {
    field: "user_right",
    headerName: "Droit utilisateur",
    flex: 2,
  },
];

const initial = {} as any;
for (const item of columns) {
  initial[item.field] = item.headerName;
}

const DataBaseTable = () => {
  const [filteredData, setFilteredData] = useState([initial]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  return (
    <Card sx={{ minHeight: 100, overflow: "scroll" }}>
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
        autoHeight
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
            width: "0.4em",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
            backgroundColor: "#dedede",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
            background: "#dedede",
          },
        }}
        // onRowSelectionModelChange={handleSelectionChange}
      />

      {selectedRows?.length > 0 ? (
        <Button className="deleteButton">
          <DeleteIcon />
          <span>Supprimer tout les champs selectionné</span>
        </Button>
      ) : null}
    </Card>
  );
};

export default DataBaseTable;
