import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar, frFR } from "@mui/x-data-grid";
import { toast } from "react-toastify";

import { Button, Tooltip } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { DataType } from "../../types/types";
import useDashboardStore from "../../store/useDataStore";
import { deleteNeed } from "../../api/Loaders";
import DeleteButton from "../DeleteRowButton";

// const renderLinkCell = () => {
//   const navigation = useNavigate()

// }

const columns: GridColDef[] = [
  {
    field: "numero",
    headerName: "#Numéro",
    flex: 1,
    renderCell: (param) => {
      return (
        <Link
          to={`/dashboard/details?id=${param.id}`}
          onClick={(e) => e.stopPropagation()}
          style={{ color: "#007FFF" }}
        >
          {param.value}
        </Link>
      );
    },
  },
  { field: "designation", headerName: "Désignation", flex: 1 },
  { field: "complexite", headerName: "Niveau", flex: 1 },
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
        .then(() => {
          fetchData();
          toast.success("Besoin supprimer");
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
          fetchData();
          toast.success("Besoins supprimés avec succés", {
            toastId: "1",
          });
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
    </div>
  );
};

export default NeedsTable;
