import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useDashboardStore from "../store/useDataStore";
import { getNeedsData } from "../api/Loaders";
import { DataType } from "../types/types";

const columns: GridColDef[] = [
  { field: "numero", headerName: "#Numéro", width: 70 },
  { field: "designation", headerName: "Désignation", width: 150 },
  { field: "niveau", headerName: "Niveau", width: 150 },
  { field: "create_at", headerName: "Date d'édition", width: 300 },
  { field: "update_at", headerName: "Date de modification", width: 300 },
  { field: "zip", headerName: "Télécharger", width: 150 },
];

const DataTable = () => {
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const { searchedValue } = useDashboardStore();

  const handleSelectionChange = (selectionModel: any[]) => {
    const selectedRows = selectionModel.map((rowId: number) => {
      // Retrieve the corresponding row object from your data source
      return filteredData.find((row) => row.id === rowId);
    });

    // Perform actions with the selected row data, such as adding it to a list
    // or updating state
    console.log(selectedRows);
  };

  useEffect(() => {
    const subscribe = () =>
      getNeedsData()
        .then((result) => {
          setFilteredData(result);
        })
        .catch((error) => console.log(error));

    return () => {
      subscribe();
    };
  }, [filteredData]);

  useEffect(() => {
    const searchedData = tableData.filter(
      (item) =>
        item.numero === searchedValue ||
        item.create_at === searchedValue ||
        item.update_at === searchedValue
    );

    setFilteredData(searchedValue !== "" ? searchedData : tableData);
  }, [searchedValue, tableData]);

  return (
    <div style={{ position: "relative" }}>
      <DataGrid
        rows={filteredData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onSelectionModelChange={handleSelectionChange}
      />
    </div>
  );
};

export default DataTable;
