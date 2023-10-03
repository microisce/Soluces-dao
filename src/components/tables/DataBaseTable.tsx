import { useEffect, useRef, useState } from "react";
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridToolbar, GridTreeNodeWithRender, frFR } from "@mui/x-data-grid";
import { Avatar, Box, Button, Card, IconButton, Link, Menu, MenuItem, Popper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataBaseType, HelpDocument } from "../../types/types";
import { deleteStep, fetchDataForDB } from "../../api/Loaders";
import { ArrowDownward, ArrowUpward, AttachFile, Clear, Delete, Edit } from "@mui/icons-material";
import React from "react";
import { BASE_URL } from "../../api/ApiManager";

type DataBaseViewProps = {
  tableData: DataBaseType[];
  onEdit: (row: DataBaseType) => void
};


const AttachmentFiles = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        sx={{width: 30, height: 30}}
        disabled={params.value.length == 0 }
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AttachFile sx={{ width: 30, height: 30 }} color={params.value.length == 0 ? "disabled" : "primary"} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          (params.value as HelpDocument[]).map((item, idx) => {
            return (
              <MenuItem onClick={handleClose}>
                <Link key={idx} 
                    fontStyle={'italic'} 
                    href={BASE_URL + item.url}
                    component={'a'}
                    target="_blank"
                    sx={{cursor: 'pointer' }}>
                    {
                      item.url.split("/medias/documents/")[1]
                    }
                  </Link>
              </MenuItem>
            )
          })
        }
       
      </Menu>
    </div>
  );
}

const getCols = (size: number, onEdit: (row: DataBaseType)=>void, onDelete: (ids: number[]) => void ): GridColDef[] => [
  { field: "icon", headerName: "Icon", 
  // flex: 1 
    renderCell: (params) => <Avatar sizes={'small'} alt="icon" sx={{ width: 30, height: 30 }} src={BASE_URL+params.value} />,
    width: 40,
    sortable: false,
    filterable: false,
    disableColumnMenu: true
  },
  
  { field: "id_code", headerName: "ID", 
    width: 70
  },

  {
    field: "family_code",
    headerName: "CF",
    width: 70
  },
  
  {
    field: "title",
    headerName: "Titre",
    // flex: 1,
  },
  {
    field: "description",
    headerName: "Desc",
    // flex: 2,
  },
  {
    field: "help_documents",
    headerName: "P.J",
    renderCell: (params) => <AttachmentFiles {...params} />,
    width: 30,
    filterable: false,
    sortable: false,
    disableColumnMenu: true
  },
  // {
  //   field: "help_documents",
  //   headerName: "Docs",
  //   renderCell: (params) => <AttachmentFiles {...params} />,
  //   width: 30,
  //   filterable: false,
  //   sortable: false,
  //   disableColumnMenu: true
  // },
  {
    field: "items_type",
    headerName: "Famille",
    flex: 1,
  },
  // {
  //   field: "conditions",
  //   headerName: "choix utilisateur",
  //   // flex: 2,
  // },
  {
    field: "user_help",
    headerName: "Aide",
    flex: 1,
  },
  // {
  //   field: "comment",
  //   headerName: "commentaire",
  //   // flex: 2,
  // },
  // {
  //   field: "help_documents",
  //   headerName: "List des documents",
  //   // flex: 2.5,
  // },
  // {
  //   field: "complexity",
  //   headerName: "Point de complexité",
  //   // flex: 2.5,
  // },
  {
    field: "user_right",
    headerName: "Droit utilisateur",
    flex: 1,
    sortable: false,
    filterable: false,
    valueGetter(params) {
      return params.value.join(",")
    },
    // flex: 2,
  },
  {
    type: 'actions',
    headerName: "Actions",
    field: "action",
    getActions(params) {
      return [
        <GridActionsCellItem
          onClick={(e) => onDelete([parseInt(params.id as string)])}
          key={params.id}
          icon={<Clear color='error' />}
          label="Effacer"
          showInMenu
         />,
        <GridActionsCellItem
          key={params.id}
          icon={<Edit  />}
          label="Modifier"
          onClick={()=>{
            //"_blank"
            window.open(BASE_URL+`/admin/ERP/step/${params.id}/change/`, '_blank');
            //return onEdit({...params.row} as DataBaseType)
          }
          }
        />,

        <GridActionsCellItem
          key={params.id}
          icon={<ArrowUpward  color="success"/>}
          label="Deplacer ver le haut"
          showInMenu
          disabled={params.row.index == 0}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<ArrowDownward color='warning' />}
          label="Deplacer vers le bas"
          disabled={params.row.index == size-1}
          showInMenu
        />,

      ]
    },
  }
];

// const initial = {} as any;
// for (const item of columns) {
//   initial[item.field] = item.headerName;
// }

const DataBaseTable = ({ tableData, onEdit }: DataBaseViewProps) => {
  const [filteredData, setFilteredData] = useState(tableData);
  const [selectedRows, setSelectedRows] = useState<DataBaseType[]>([]);

  function fetchDataDB() {
    fetchDataForDB().then((response) => {
      setFilteredData(response);
    });
  }

  function onDelete(ids: number[]) {
    if (ids.length == 1){
      try {
        deleteStep(ids[0])
        .then(data => setFilteredData(data))
      } catch (error) {
        console.error(error)
      }
      
    }
  }
  function colsRenderer(){
    return getCols(
      filteredData.length,
      onEdit,
      onDelete
    )
  }
  

  useEffect(() => {
    fetchDataDB();
    console.log(tableData);
  }, [tableData]);

  console.log(filteredData)

  return (
    <Card sx={{ minHeight: 100 }}>
      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        //rows={[]}
        rows={filteredData.map((item, idx) => ({...item, index: idx})).sort((a,b)=>a.rank-b.rank)}
        columns={colsRenderer()}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        getRowId={(item) => item.id}
        
        onRowSelectionModelChange={(models, details) => setSelectedRows(filteredData.filter((item, idx) => models.includes(idx)))}
        pageSizeOptions={[5, 10]}
        components={{
          Toolbar: GridToolbar,
        }}
        editMode='row'
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
          <Clear color="error"/>
          <span>
            Supprimer tout les elements sélectionnés
          </span>
        </Button>
      ) : null}
    </Card>
  );
};

export default DataBaseTable;
