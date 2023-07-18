import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
// import type { TableRowSelection } from "antd/es/table/interface";
import { DataType } from "../types/types";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import useDashboardStore from "../store/useDataStore";
import { getNeedsData } from "../api/Loaders";

const deleteNeed = (rowId: string) => {};

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
    dataIndex: "create_at",
  },
  {
    title: "Date modification",
    dataIndex: "update_at",
  },
  {
    title: "Télécharger",
    dataIndex: "zip",
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

const DataTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const { searchedValue } = useDashboardStore();

  const onSelectChange = (newSelectedRowKeys: string[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);

    if (newSelectedRowKeys.length > 0) {
      setShowDeleteButton(true);
    } else {
      setShowDeleteButton(false);
    }
  };

  useEffect(() => {
    getNeedsData()
      .then((result) => {
        setTableData(result);
      })
      .catch((error) => console.log(error));

    return () => {
      tableData;
    };
  }, [tableData]);

  useEffect(() => {
    setFilteredData(tableData);

    const searchedData = tableData.filter(
      (item) =>
        item.numero === searchedValue ||
        // item.ni === searchedValue ||
        item.create_at === searchedValue ||
        item.update_at === searchedValue
    );

    if (searchedValue !== "") {
      setFilteredData(searchedData);
    }
  }, [searchedValue, tableData]);

  // const rowSelection: TableRowSelection<DataType> = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  //   selections: [
  //     Table.SELECTION_ALL,
  //     Table.SELECTION_INVERT,
  //     Table.SELECTION_NONE,
  //     {
  //       key: "odd",
  //       text: "Select Odd Row",
  //       onSelect: (changeableRowKeys) => {
  //         let newSelectedRowKeys = [];
  //         newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
  //           if (index % 2 !== 0) {
  //             return false;
  //           }
  //           return true;
  //         });
  //         setSelectedRowKeys(newSelectedRowKeys);
  //       },
  //     },
  //     {
  //       key: "even",
  //       text: "Select Even Row",
  //       onSelect: (changeableRowKeys) => {
  //         let newSelectedRowKeys = [];
  //         newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
  //           if (index % 2 !== 0) {
  //             return true;
  //           }
  //           return false;
  //         });
  //         setSelectedRowKeys(newSelectedRowKeys);
  //       },
  //     },
  //   ],
  // };

  return (
    <div style={{ position: "relative" }}>
      <Table
        // rowSelection={rowSelection}
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
