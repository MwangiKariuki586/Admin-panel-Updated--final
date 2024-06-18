import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Add from "../../components/add/Add";
import "./Users.scss";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "../../components/dataTable/DataTable";
import UserContext from "../../context/UserContext";
import Single from "../../components/single/Single";
import { selectClasses } from "@mui/material";
import { reg_users_api, users_api } from "../../variables/variables";
const Users = () => {
  const [open, setOpen] = useState(false);

  const { departmentdata } = useContext(UserContext); //api data
  const departments = departmentdata.map(
    (department) => department.Department_name
  );
  const { locationdata } = useContext(UserContext); //api data
  const locations = locationdata.map((location) => location.Location_name);
  const { userdata } = useContext(UserContext); //api data

  const { setSelectedRow } = useContext(UserContext);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "staffid",
      name: "staffid",
      headerName: "Staff ID",
      type: "Number",
      width: 150,
      editable: true,
    },
    {
      field: "staff_name",
      name: "staff_name",
      headerName: "Staff name",
      type: "text",
      width: 150,
      editable: true,
    },

    {
      field: "department_name",
      name: "department",
      headerName: "Department",
      type: "singleSelect",
      valueOptions: departments,
      width: 110,
      editable: true,
    },
    {
      field: "location_name",
      name: "location",
      headerName: "Location",
      type: "singleSelect",
      valueOptions: locations,
      width: 110,
      editable: true,
    },

    {
      field: "is_active",
      name: "is_active",
      headerName: "Active",
      type: "Checkbox",
      width: 110,
      editable: true,
      renderCell: (params) => (params.value ? <CheckIcon /> : <ClearIcon />),
    },
    {
      field: "is_staff",
      name: "is_staff",
      headerName: "Admin",
      type: "Checkbox",
      editable: true,
      width: 110,
      renderCell: (params) => (params.value ? <CheckIcon /> : <ClearIcon />),
    },
    {
      field: "is_superuser",
      name: "is_superuser",
      headerName: "Superuser",
      type: "Checkbox",
      editable: true,
      width: 110,
      renderCell: (params) => (params.value ? <CheckIcon /> : <ClearIcon />),
    },
    {
      field: "date_joined",
      headerName: "Date Joined",
      type: "Date",
      width: 110,
    },
    {
      field: "last_login",
      headerName: "Last Login",
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
  const getFormFields = () => {
    return columns
      .filter((column) => column.field !== "id" && column.type !== "Date") // Exclude "id" field
      .map((column) => ({
        [column.field]: userdata[column.field], // Map each field to its corresponding value from userdata
      }));
  };

  const handleRowSelection = (user) => {
    setSelectedRow(user); // Update selectedRow in context with the clicked user
    sessionStorage.setItem("selectedUserData", JSON.stringify(user));
  };
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      <DataTable
        slug="users"
        handleDelete="delete"
        columns={columns}
        rows={userdata}
        onRowSelection={handleRowSelection}
        endpoint={users_api}
        passwordfields={true}
      />

      {open && (
        <Add
          slug="User"
          columns={columns}
          setOpen={setOpen}
          endpoint={reg_users_api}
          method="POST"
          formData={getFormFields()}
          onSuccess={handleSubmitSuccess}
          onError={handleSubmitError}
          passwordfields={true}
          // isUpdate={selectedRow}
        />
      )}
    </div>
  );
};

export default Users;
