import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar, frFR } from "@mui/x-data-grid";
import useDashboardStore from "../store/useDataStore";
import { deleteNeed } from "../api/Loaders";
import { DataType } from "../types/types";
import { toast } from "react-toastify";
import DeleteButton from "./DeleteRowButton";
import { Button, Tooltip } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  {
    field: "numero",
    headerName: "#Numéro",
    flex: 1,
    renderCell: (param) => {
      return (
        <a
          onClick={(e) => e.stopPropagation()}
          href={`/dashboard/create/${param.id}`}
          style={{ color: "#007FFF" }}
        >
          {param.value}
        </a>
      );
    },
  },
  { field: "designation", headerName: "Désignation", flex: 1 },
  { field: "state", headerName: "Niveau", flex: 1 },
  {
    field: "create_at",
    headerName: "Date d'édition",
    flex: 1,
    renderCell: (param) => {
      return <p>{moment(param.value).format("DD/MM/YY")}</p>;
    },
  },
  {
    field: "update_at",
    headerName: "Date de modification",
    flex: 1,
    renderCell: (param) => {
      return <p>{moment(param.value).format("DD/MM/YY")}</p>;
    },
  },
];

type TableDataProp = {
  data: DataType[];
  fetchData: () => void;
};

const NeedsTable = ({ data, fetchData }: TableDataProp) => {
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const { searchedValue } = useDashboardStore();

  const renderDeleteCell = (params: { row: { id: number } }) => {
    const handleDeleteClick = () => {
      const rowId = params.row.id;
      deleteNeed(rowId)
        .then((result) => {
          toast.success("Besoin supprimer");
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return <DeleteButton onClick={handleDeleteClick} />;
  };

  const renderFileDownloadCell = () => {
    return (
      <a href="/" style={{ color: "#007FFF" }}>
        extract zip
      </a>
    );
  };

  const handleSelectionChange = (selectionModel: number[]) => {
    if (selectionModel.length > 0) {
      setSelectedRows(selectionModel);
    } else {
      setSelectedRows([]);
    }
  };

  const deleteMultipleSelectedRows = () => {
    selectedRows.forEach((row: number) => {
      console.log(row);
      deleteNeed(row)
        .then(() => {
          toast.success("Besoins supprimés avec succés", {
            toastId: "1",
          });
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  useEffect(() => {
    const searchedData = data.filter(
      (item) =>
        item.numero === searchedValue ||
        item.create_at === searchedValue ||
        item.update_at === searchedValue
    );

    setFilteredData(searchedValue !== "" ? searchedData : data);
  }, [searchedValue, data]);

  return (
    <div style={{ position: "relative" }}>
      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        rows={filteredData}
        columns={[
          ...columns,
          {
            field: "Telecharger",
            headerName: "Télécharger",
            sortable: false,
            flex: 1,
            renderCell: renderFileDownloadCell,
          },
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
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleSelectionChange}
      />

      {selectedRows?.length > 0 ? (
        <Button className="deleteButton" onClick={deleteMultipleSelectedRows}>
          <DeleteIcon />
          <span>Supprimer tout les champs selectionné</span>
        </Button>
      ) : null}
    </div>
  );
};

export default NeedsTable;
