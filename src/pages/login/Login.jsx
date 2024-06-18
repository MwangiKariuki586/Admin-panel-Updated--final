import { useContext, useEffect, useState } from "react";
import signin from "../../images/kenindia.jpg";
import logo from "../../images/kenindiaLogo.png";
import "./login.scss";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { login_api, refresh_api } from "../../variables/variables";
const Login = () => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(UserContext);

  const [errors, setErrors] = useState({
    staffid: "",
    password: "",
  });

  const [formValues, setFormValues] = useState({
    staffid: "",
    password: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error message for the current field
    }));
  };
  const refreshToken = () => {
    setInterval(() => {
      if (localStorage.refresh) {
        axios
          .post(refresh_api, {
            refresh: JSON.parse(localStorage.getItem("refresh")),
          })
          .then((response) => {
            console.log(response);
            localStorage.setItem(
              "access",
              JSON.stringify(response.data.access)
            );
            localStorage.setItem(
              "refresh",
              JSON.stringify(response.data.refresh)
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 60000);
  };

  const signinUser = (event) => {
    event.preventDefault();
    let formErrors = {};
    const fields = ["staffid", "password"];

    fields.forEach((field) => {
      if (!formValues[field]) {
        formErrors[field] = "This field is required";
      }
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    axios
      .post(login_api, formValues)
      .then((response) => {
        console.log(response);
        if (response.status == 200 && response.data.is_staff == true) {
          const access = response.data.access;
          const refresh = response.data.refresh;
          localStorage.setItem("access", access);
          localStorage.setItem("refresh", refresh);
          navigate("/");
        } else {
          alert("user is not an admin");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          // setIsloading(false);
          alert("Invalid StaffID");
        } else {
          // setIsloading(false);
          alert("Login Failed");
        }
      });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <img src={signin} alt="Sign in" className="signin-image" />
        <div className="form">
          <div className="div">
            <img src={logo} alt="logo" className="kenindiaLogo" />
          </div>
          <h1>Welcome</h1>
          <div className="input_container">
            <input
              name="staffid"
              onChange={handleInputChange}
              type="number"
              placeholder="Enter your staff ID"
              className="input-field"
            />
            {errors.staffid && (
              <small className="error">{errors.staffid}</small>
            )}
          </div>
          <div className="input_container">
            <input
              name="password"
              onChange={handleInputChange}
              type="password"
              placeholder="Enter your password"
              className="input-field"
            />
            {errors.password && (
              <small className="error">{errors.password}</small>
            )}
          </div>
          <button className="submit-button" onClick={signinUser}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
