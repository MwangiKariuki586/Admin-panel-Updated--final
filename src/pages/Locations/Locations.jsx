import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Add from "../../components/add/Add";
import "./locations.scss";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "../../components/dataTable/DataTable";
import UserContext from "../../context/UserContext";
import { locations_api } from "../../variables/variables";
const Locations = () => {
  const [open, setOpen] = useState(false);
  const { locationdata } = useContext(UserContext); //api data
  const locations = locationdata.map((location) => location.Location_name);
  const { setSelectedRow } = useContext(UserContext);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Location_name",
      name: "Location_name",
      headerName: "Location",
      type: "Text",

      width: 110,
      editable: true,
    },
    {
      field: "time_created",
      type: "Date",
      headerName: "time created",
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
        <h1>Locations</h1>
        <button onClick={() => setOpen(true)}>Add New Location</button>
      </div>
      <DataTable
        slug="location"
        columns={columns}
        rows={locationdata}
        onRowSelection={handleRowSelection}
        handleDelete="delete"
        endpoint={locations_api}
      />

      {open && (
        <Add
          slug="Location"
          columns={columns}
          setOpen={setOpen}
          endpoint={locations_api}
          method="POST"
          onSuccess={handleSubmitSuccess}
          onError={handleSubmitError}
        />
      )}
    </div>
  );
};

export default Locations;
