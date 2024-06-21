import { useState } from "react";

import UserContext from "./UserContext";
import axios from "../hooks/axios";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  departments_api,
  toners_api,
  locations_api,
  printers_api,
  users_api,
  toner_requests_api,
  location_api,
  department_api,
  printer_api,
  toner_api,
} from "../variables/variables";
const UserContextProvider = ({ children }) => {
  const [authenticate, setAuthenticate] = useState(
    localStorage.getItem("access")
      ? jwtDecode(localStorage.getItem("access"))
      : null
  );
  const [auth, setAuth] = useState(authenticate);
  const [user, setUser] = useState(false);
  const [printerdata, setPrinterdata] = useState([]);
  const [locationdata, setLocationdata] = useState([]);
  const [tonerdata, setTonerdata] = useState([]);
  const [departmentdata, setDepartmentdata] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [toner_requests, setToner_requests] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const rowdata = sessionStorage.getItem("selectedUserData");
  const selectedUserData = sessionStorage.getItem("selectedUserData")
    ? JSON.parse(rowdata)
    : null;
  const [dataChanged, setDataChanged] = useState(false);
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("access")
    ? localStorage.getItem("access")
    : null;
  const refreshToken = localStorage.getItem("refresh")
    ? localStorage.getItem("refresh")
    : null;
  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken
      ? `Bearer ${accessToken}`
      : console.log("token not found"),
  };
  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [dataChanged, accessToken]);

  const fetchData = async () => {
    try {
      await Promise.all([
        getDepartments(),
        getToners(),
        getLocations(),
        getPrinters(),
        getUsers(),
        getTonerrequests(),
      ]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching data:", err);
      setError(err);
    }
  };
  // useEffect(() => {
  //   getPrinters();
  //   getLocations();
  //   getToners();
  //   getDepartments();
  //   getUsers();
  //   getTonerrequests();
  // }, [dataChanged]);

  const getDepartments = () => {
    axios
      .get(departments_api)
      .then((response) => {
        // console.log(response.data.Departments);
        setDepartmentdata(response.data.Departments); // Assuming response.data contains the array of users
      })
      .catch((err) => {
        console.log(err);
        // Handle error here, e.g., display an error message to the user
      });
  };
  const getToners = () => {
    axios
      .get(toners_api)
      .then((response) => {
        // console.log(response.data.Toners);
        setTonerdata(response.data.Toners); // Assuming response.data contains the array of users
      })
      .catch((err) => {
        console.log(err);
        // Handle error here, e.g., display an error message to the user
      });
  };
  const getLocations = () => {
    axios
      .get(locations_api)
      .then((response) => {
        // console.log(response.data.Locations);
        setLocationdata(response.data.Locations); // Assuming response.data contains the array of users
      })
      .catch((err) => {
        console.log(err);
        // Handle error here, e.g., display an error message to the user
      });
  };
  const getPrinters = () => {
    axios
      .get(printers_api)
      .then((response) => {
        // console.log(response.data.Printer);
        setPrinterdata(response.data.Printer); // Assuming response.data contains the array of users
      })
      .catch((err) => {
        console.log(err);
        // Handle error here, e.g., display an error message to the user
      });
  };
  const getUsers = () => {
    axios
      .get(users_api)
      .then((response) => {
        // console.log(response.data.Users);
        setUserdata(response.data); // Assuming response.data contains the array of users
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        // Handle error here, e.g., display an error message to the user
      });
  };
  const getTonerrequests = () => {
    axios
      .get(toner_requests_api)
      .then((response) => {
        // console.log(response.data);
        setToner_requests(response.data); // Assuming response.data contains the array of users
      })
      .catch((err) => {
        console.log(err);
        // Handle error here, e.g., display an error message to the user
      });
  };
  const getLocationId = async (locationName) => {
    try {
      const response = await axios.get(location_api(locationName));
      return response.data.id;
    } catch (error) {
      console.error("Error fetching location ID:", error);
      throw error;
    }
  };

  const getDepartmentId = async (departmentName) => {
    try {
      const response = await axios.get(department_api(departmentName));
      return response.data.id;
    } catch (error) {
      console.error("Error fetching department ID:", error);
      throw error;
    }
  };
  const getprinterId = async (printerName) => {
    try {
      const response = await axios.get(printer_api(printerName));
      return response.data.id;
    } catch (error) {
      console.error("Error fetching printer ID:", error);
      throw error;
    }
  };

  const getTonerId = async (tonerName) => {
    try {
      const response = await axios.get(toner_api(tonerName));
      return response.data.id;
    } catch (error) {
      console.error("Error fetching toner ID:", error);
      throw error;
    }
  };
  const logoutUser = () => {
    setAuth(false);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };
  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        headers,
        username,
        setUsername,
        authenticate,
        auth,
        user,
        setAuth,
        setUser,
        logoutUser,
        printerdata,
        departmentdata,
        locationdata,
        tonerdata,
        userdata,
        dataChanged,
        setUserdata,
        toner_requests,
        setToner_requests,
        selectedRow,
        setSelectedRow,
        selectedUserData,
        setDataChanged,
        getLocationId,
        getDepartmentId,
        getprinterId,
        getTonerId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
