import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import { DataType } from "../types/types";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import useDashboardStore from "../store/useDataStore";

const columns: ColumnsType<DataType> = [
  {
    title: "#Numéro",
    dataIndex: "numero",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Désignation",
    dataIndex: "designation",
  },
  {
    title: "Niveau",
    dataIndex: "niveau",
  },
  {
    title: "Date d'édition",
    dataIndex: "date_edition",
  },
  {
    title: "Date modification",
    dataIndex: "date_modification",
  },
  {
    title: "Télécharger",
    dataIndex: "telecharger",
    render: (text: string) => <a href="">{text}</a>,
  },
  {
    title: "",
    dataIndex: "delete",
    render: () => (
      <Button variant="text">
        <CloseIcon style={{ color: "red" }} />
      </Button>
    ),
  },
];

// Array that holds all data shown on the table
const data: DataType[] = [];

for (let i = 0; i < 40; i++) {
  data.push({
    key: i,
    numero: `EB${i}`,
    designation: "00084561P1_VALOIR",
    niveau: "SIMPLE",
    date_edition: "17/06/2023",
    date_modification: "25/07/2023 ",
    telecharger: "extract zip",
  });
}

const DataTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { searchedValue } = useDashboardStore();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);

    if (newSelectedRowKeys.length > 0) {
      setShowDeleteButton(true);
    } else {
      setShowDeleteButton(false);
    }
  };

  useEffect(() => {
    setFilteredData(data);

    const searchedData = data.filter(
      (item) =>
        item.numero === searchedValue ||
        item.niveau === searchedValue ||
        item.date_modification === searchedValue ||
        item.date_edition === searchedValue
    );

    if (searchedValue !== "") {
      setFilteredData(searchedData);
    }
  }, [searchedValue]);

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div style={{ position: "relative" }}>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData}
        bordered={true}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
        }}
      />
      {showDeleteButton && (
        <Button
          variant="text"
          style={{
            position: "absolute",
            top: 10,
            right: 83,
          }}
          hidden={showDeleteButton}
        >
          <DeleteIcon style={{ color: "#7e7e7e" }} />
        </Button>
      )}
    </div>
  );
};

export default DataTable;
