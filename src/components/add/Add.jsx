import React, { useContext, useEffect, useState } from "react";
import "./add.scss";
import axios from "axios";
import UserContext from "../../context/UserContext";
const Add = ({
  endpoint,
  slug,
  columns,
  passwordfields,
  onSuccess,
  onError,
  setOpen,
}) => {
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState({});
  const accessToken = localStorage.getItem("access");
  const {
    getLocationId,
    getDepartmentId,
    getprinterId,
    getTonerId,
    dataChanged,
    setDataChanged,
    headers,
  } = useContext(UserContext);
  useEffect(() => {
    // Reset form state when modal is closed
    return () => setFormState({});
  }, [setOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedFormState = { ...formState };

      // Conditionally fetch location ID if the location field exists
      if (formState.location) {
        const locationId = await getLocationId(formState.location);
        updatedFormState = {
          ...updatedFormState,
          location: locationId,
        };
      }

      // Conditionally fetch department ID if the department field exists
      if (formState.department) {
        const departmentId = await getDepartmentId(formState.department);
        updatedFormState = {
          ...updatedFormState,
          department: departmentId,
        };
      }
      // Conditionally fetch toner ID if the department field exists
      if (formState.toner) {
        const tonerId = await getTonerId(formState.toner);
        updatedFormState = {
          ...updatedFormState,
          toner: tonerId,
        };
      }

      // Conditionally fetch printer ID if the department field exists
      if (formState.printer) {
        const printerId = await getprinterId(formState.printer);
        updatedFormState = {
          ...updatedFormState,
          printer_name: printerId,
        };
      }
      // Send the request with updated form state
      const response = await axios.post(endpoint, updatedFormState, {
        headers,
      });

      if (onSuccess) {
        onSuccess(response.data);
        setDataChanged(!dataChanged);
        setOpen(false);
        console.log(formState);
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      if (onError) {
        alert("invalid data or server error");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const comparePasswords = () => {
    if (formState.password_confirmation !== formState.password) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Add new {slug}</h1>
        <form onSubmit={handleSubmit}>
          {columns
            .filter(
              (item) =>
                item.field !== "id" &&
                item.field !== "img" &&
                item.field !== "is_active" &&
                item.field !== "is_superuser" &&
                item.type !== "Date"
            )
            .map((column) => (
              <div
                className="item"
                style={{ width: columns.length > 4 ? "45%" : "100%" }}
                key={column.field}
              >
                <label>{column.headerName}</label>
                {column.type === "Checkbox" ? (
                  <input
                    type="checkbox"
                    name={column.name}
                    checked={formState[column.field] || false}
                    onChange={handleInputChange}
                    style={{ marginRight: "auto" }}
                  />
                ) : column.type === "singleSelect" && column.valueOptions ? (
                  <select
                    value={formState[column.name] || ""}
                    onChange={handleInputChange}
                    name={column.name}
                    required
                  >
                    <option value="">Select...</option>
                    {column.valueOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className=""
                    type={column.type}
                    placeholder={column.field}
                    value={formState[column.field] || ""}
                    onChange={handleInputChange}
                    name={column.name}
                    required
                  />
                )}
              </div>
            ))}
          {passwordfields && (
            <>
              <div className="item">
                <label htmlFor="">password</label>
                <input
                  type="password"
                  placeholder="enter password"
                  onChange={handleInputChange}
                  name="password"
                  required
                />
              </div>
              <div className="item">
                <label htmlFor="">confirm password</label>
                <input
                  type="password"
                  placeholder="confirm password"
                  onChange={handleInputChange}
                  onBlur={comparePasswords}
                  name="password_confirmation"
                  required
                />
                {error && <span className="error">passwords do not match</span>}
              </div>
            </>
          )}
          <button type="submit" disabled={error}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
