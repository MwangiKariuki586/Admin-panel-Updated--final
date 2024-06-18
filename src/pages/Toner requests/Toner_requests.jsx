import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Add from "../../components/add/Add";
import "./toner_requests.scss";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "../../components/dataTable/DataTable";
import UserContext from "../../context/UserContext";
import { toner_requests_api } from "../../variables/variables";
const Toner_requests = () => {
  const [open, setOpen] = useState(false);
  const { setSelectedRow } = useContext(UserContext);
  const { departmentdata } = useContext(UserContext); //api data
  const departments = departmentdata.map(
    (department) => department.Department_name
  );
  const { locationdata } = useContext(UserContext); //api data
  const locations = locationdata.map((location) => location.Location_name);
  const { tonerdata } = useContext(UserContext); //api data
  const toners = tonerdata.map((toner) => toner.Toner_name);
  const { printerdata } = useContext(UserContext); //api data
  const printers = printerdata.map((printer) => printer.Printer_name);
  const { toner_requests } = useContext(UserContext); //api data
  const columns = [
    { field: "id", headerName: "ID", width: 85 },
    {
      field: "user_staffname",
      name: "user_staffname",
      headerName: "Staff name",
      type: "text",
      width: 148,
      editable: true,
    },
    {
      field: "user_staffid",
      name: "user_staffid",
      headerName: "Staff id",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: "user_department",
      name: "user_department",
      headerName: "Department",
      type: "singleSelect",
      valueOptions: departments,
      width: 158,
    },
    {
      field: "user_location",
      name: "user_location",
      headerName: "Location",
      type: "singleSelect",
      valueOptions: locations,
      width: 131,
    },

    {
      field: "toner_name",
      name: "toner",
      headerName: "Toner",
      type: "singleSelect",
      valueOptions: toners,
      width: 109,
    },
    {
      field: "printer",
      name: "printer",
      headerName: "Printer",
      type: "singleSelect",
      valueOptions: printers,
      width: 118,
    },
    {
      field: "issued",
      name: "issued",
      headerName: "Issued",
      type: "Checkbox",
      width: 115,
      renderCell: (params) => (params.value ? <CheckIcon /> : <ClearIcon />),
    },
    {
      field: "Date_of_request",
      headerName: "Date",
      type: "Date",
      width: 103,
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
        [column.field]: toner_requests[column.field], // Map each field to its corresponding value from tonerrequests
      }));
  };
  const handleRowSelection = (user) => {
    setSelectedRow(user); // Update selectedRow in context with the clicked user
    sessionStorage.setItem("selectedUserData", JSON.stringify(user));
  };
  return (
    <div className="toner_requests">
      <div className="info">
        <h1>Toner requests</h1>
        <button onClick={() => setOpen(true)}>Add New Request</button>
      </div>
      <DataTable
        slug="toner_request"
        handleDelete="delete"
        columns={columns}
        rows={toner_requests}
        onRowSelection={handleRowSelection}
        endpoint={toner_requests_api}
      />

      {open && (
        <Add
          slug="Request"
          columns={columns}
          setOpen={setOpen}
          endpoint={toner_requests_api}
          method="POST"
          formData={getFormFields()}
          onSuccess={handleSubmitSuccess}
          onError={handleSubmitError}
        />
      )}
    </div>
  );
};

export default Toner_requests;
