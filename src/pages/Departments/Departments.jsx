import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Add from "../../components/add/Add";
import "./departments.scss";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "../../components/dataTable/DataTable";
import UserContext from "../../context/UserContext";
import { departments_api } from "../../variables/variables";
const Departments = () => {
  const [open, setOpen] = useState(false);
  const { departmentdata } = useContext(UserContext); //api data
  const departments = departmentdata.map(
    (department) => department.Department_name
  );
  const { setSelectedRow } = useContext(UserContext);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Department_name",
      name: "Department_name",
      headerName: "Department",
      type: "Text",

      width: 110,
      editable: true,
    },
    {
      field: "time_created",
      headerName: "time created",
      type: "Date",
      width: 110,
    },
  ];
  const handleSubmitSuccess = (data) => {
    console.log("Form submitted successfully:", data);
    // Handle success
  };

  const handleSubmitError = (error) => {
    console.error("Error submitting form:", error);
    // Handle error
  };
  const handleRowSelection = (user) => {
    setSelectedRow(user); // Update selectedRow in context with the clicked user
    sessionStorage.setItem("selectedUserData", JSON.stringify(user));
  };
  return (
    <div className="users">
      <div className="info">
        <h1>Departments</h1>
        <button onClick={() => setOpen(true)}>Add New Department</button>
      </div>
      <DataTable
        slug="department"
        columns={columns}
        rows={departmentdata}
        onRowSelection={handleRowSelection}
        handleDelete="delete"
        endpoint={departments_api}
      />

      {open && (
        <Add
          slug="Department"
          columns={columns}
          setOpen={setOpen}
          endpoint={departments_api}
          method="POST"
          onSuccess={handleSubmitSuccess}
          onError={handleSubmitError}
        />
      )}
    </div>
  );
};

export default Departments;
