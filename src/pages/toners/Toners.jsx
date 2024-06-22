import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Add from "../../components/add/Add";
import "./toners.scss";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "../../components/dataTable/DataTable";
import UserContext from "../../context/UserContext";
import { toners_api } from "../../variables/variables";
const Toners = () => {
  const [open, setOpen] = useState(false);
  const { tonerdata } = useContext(UserContext); //api data
  const { printerdata } = useContext(UserContext); //api data
  const printers = printerdata.map((printer) => printer.Printer_name);
  const toners = tonerdata.map((toner) => toner.Toner_name);
  const { setSelectedRow } = useContext(UserContext);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Toner_name",
      name: "Toner_name",
      headerName: "Toner",
      type: "text",

      width: 150,
      editable: true,
    },
    {
      field: "quantity",
      name: "quantity",
      headerName: "quantity",
      type: "Number",
      width: 150,
      editable: true,
    },
    // {
    //   field: "printer_name",
    //   name: "printer_name",
    //   headerName: "printer",
    //   type: "singleSelect",
    //   valueOptions: printers,
    //   width: 110,
    //   editable: true,
    // },
    {
      field: "time_created",
      headerName: "time created",
      type: "Date",
      width: 110,
    },
  ];
  const handleRowSelection = (user) => {
    setSelectedRow(user); // Update selectedRow in context with the clicked user
    sessionStorage.setItem("selectedUserData", JSON.stringify(user));
  };
  const handleSubmitSuccess = (data) => {
    console.log("Form submitted successfully:", data);
    // Handle success
  };

  const handleSubmitError = (error) => {
    console.error("Error submitting form:", error);
    // Handle error
  };
  return (
    <div className="users">
      <div className="info">
        <h1>Toners</h1>
        <button onClick={() => setOpen(true)}>Add New Toner</button>
      </div>
      <DataTable
        slug="toner"
        handleDelete="delete"
        columns={columns}
        rows={tonerdata}
        endpoint={toners_api}
        onRowSelection={handleRowSelection}
      />

      {open && (
        <Add
          slug="Toner"
          columns={columns}
          setOpen={setOpen}
          endpoint={toners_api}
          method="POST"
          // formData={getFormFields()}
          onSuccess={handleSubmitSuccess}
          onError={handleSubmitError}
        />
      )}
    </div>
  );
};

export default Toners;
