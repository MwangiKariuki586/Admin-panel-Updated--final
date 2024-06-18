import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { auth, headers } = useContext(UserContext);
  const [active_user, setActive_user] = useState(false);

  const verifyToken = () => {
    axios
      .get("http://localhost:8000/api/verify/", { headers })
      .then((res) => {
        console.log(res);
        if (res.request.status === 200) {
          setActive_user(true);
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useState(() => {
    verifyToken();
  }, []);
  if (!localStorage.access) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoutes;
