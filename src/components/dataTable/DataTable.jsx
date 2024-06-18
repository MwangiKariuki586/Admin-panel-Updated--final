import React, { useContext, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import "./dataTable.scss";
import UserContext from "../../context/UserContext";
import Areyousure from "../are you sure/Areyousure";
const DataTable = ({
  slug,
  columns,
  rows,
  onRowSelection,
  endpoint,
  passwordfields,
  handleDelete,
}) => {
  const { selectedRow } = useContext(UserContext);
  const urlData = endpoint;
  const passwordinput = passwordfields;
  const [delete_entry, setDeleteEntry] = useState(false);

  const handleRowClick = (row) => {
    onRowSelection(row); // Invoke the onRowSelection function with the clicked user data
    // console.log("selectedRow:", selectedRow);
    console.log(urlData);
    // console.log(passwordinput);
  };

  const actionColumn = {
    field: "action",
    headerName: "Actions",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="action">
          {/* Link to view details */}
          <Link
            to={`/${slug}/${params.row.id}`}
            state={{ urlData: urlData, passwordinput: passwordinput }}
          >
            <img src="/view.svg" alt="View Details" />
          </Link>
          {/* Link to delete item */}
          <Link
            to={`/${handleDelete}/${params.row.id}`}
            state={{ urlData: urlData }}
          >
            <img src="/delete.svg" alt="Delete" />
          </Link>
        </div>
      );
    },
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={[actionColumn, ...columns]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableDensitySelector
        disableColumnSelector
        onRowClick={handleRowClick}
      />
    </Box>
  );
};

export default DataTable;
