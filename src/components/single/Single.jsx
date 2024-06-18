import React, { useContext, useState, useEffect } from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./single.scss";
import UserContext from "../../context/UserContext";
import { singleUser } from "../../data";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Single = (props) => {
  const [error, setError] = useState(false);
  const {
    selectedUserData,
    locationdata,
    tonerdata,
    printerdata,
    departmentdata,
    dataChanged,
    setDataChanged,
    headers,
  } = useContext(UserContext);
  const items = selectedUserData?.row || {};
  const [formState, setFormState] = useState({});
  let { state } = useLocation();
  const [passfields, setPassfields] = useState(state.passwordinput);
  const navigate = useNavigate();
  useEffect(() => {
    setFormState(items);
  }, [items]);

  const handleUpdate = async (e) => {
    // console.log("Endpoint:", state);
    // console.log(passfields);
    e.preventDefault();
    try {
      const response = await axios.put(
        `${state.urlData}${formState.id}/`,
        formState,
        { headers }
      );
      if (response) {
        // console.log(response);
        // console.log(formState);
      }
      if (response.request.status === 200) {
        setDataChanged(!dataChanged);
        navigate(-1);
      }
    } catch (error) {
      alert("invalid data or server error");
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    //console.log("Input Change:", name, value);
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
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <h1>
              {items.staff_name ||
                items.user_staffname ||
                items.Toner_name ||
                items.Printer_name ||
                items.Department_name ||
                items.Location_name}
            </h1>
            <button onClick={handleUpdate}>Update</button>
          </div>
          {selectedUserData && selectedUserData.row && (
            <div className="item">
              {Object.keys(items).map((key) => {
                if (
                  key !== "id" &&
                  key !== "department_name" &&
                  key !== "location_name" &&
                  key !== "printer_name" &&
                  key !== "toner" &&
                  key !== "Date_of_request" &&
                  key !== "date_joined" &&
                  key !== "last_login" &&
                  key !== "time_created" &&
                  key !== "is_superuser" &&
                  key !== "is_active" &&
                  items[key] !== null
                ) {
                  const isDepartment = [
                    "user_department",
                    "department",
                  ].includes(key);
                  const isLocation = ["user_location", "location"].includes(
                    key
                  );
                  const isNumber = [
                    "staffid",
                    "user_staffid",
                    "quantity",
                  ].includes(key);
                  const isToner = ["toner_name"].includes(key);
                  const isPrinter = ["printer"].includes(key);
                  return (
                    <div className="single_item" key={key}>
                      <span className="">{key}</span>
                      {typeof items[key] === "boolean" ? (
                        <input
                          type="checkbox"
                          className="check"
                          name={key}
                          checked={formState[key] || false}
                          onChange={handleInputChange}
                        />
                      ) : isNumber ? (
                        <input
                          type="number"
                          name={key}
                          className="itemValue"
                          value={formState[key] || ""}
                          onChange={handleInputChange}
                        />
                      ) : typeof items[key] === "string" &&
                        items[key].includes("03:00") ? (
                        <span>{new Date(items[key]).toLocaleString()}</span>
                      ) : isDepartment ? (
                        <select
                          name={key}
                          className="itemValue"
                          value={formState[key] || ""}
                          onChange={handleInputChange}
                        >
                          {departmentdata?.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.Department_name}
                            </option>
                          ))}
                        </select>
                      ) : isLocation ? (
                        <select
                          name={key}
                          className="itemValue"
                          value={formState[key] || ""}
                          onChange={handleInputChange}
                        >
                          {locationdata?.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.Location_name}
                            </option>
                          ))}
                        </select>
                      ) : isToner ? (
                        <select
                          name={key}
                          className="itemValue"
                          value={formState[key] || ""}
                          onChange={handleInputChange}
                        >
                          {tonerdata?.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.Toner_name}
                            </option>
                          ))}
                        </select>
                      ) : isPrinter ? (
                        <select
                          name={key}
                          className="itemValue"
                          value={formState[key] || ""}
                          onChange={handleInputChange}
                        >
                          {printerdata?.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.Printer_name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          name={key}
                          className="itemValue"
                          value={formState[key] || ""}
                          onChange={handleInputChange}
                        />
                      )}
                    </div>
                  );
                }
                return null;
              })}
              {passfields && (
                <>
                  <div className="single_item">
                    <span>password:</span>
                    <input
                      type="password"
                      placeholder="enter password"
                      onChange={handleInputChange}
                      name="password"
                    />
                  </div>
                  <div className="single_item">
                    <span>confirm password:</span>
                    <input
                      type="password"
                      placeholder="confirm password"
                      onChange={handleInputChange}
                      onBlur={comparePasswords}
                      name="password_confirmation"
                    />
                    {error && (
                      <span className="error">passwords do not match</span>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <hr />
        {singleUser.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={singleUser.chart.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {singleUser.chart.dataKeys.map((dataKey) => (
                  <Line
                    key={dataKey.name}
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Single;
