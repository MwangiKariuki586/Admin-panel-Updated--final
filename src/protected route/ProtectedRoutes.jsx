import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { headers, loading } = useContext(UserContext);

  const verifyToken = () => {
    axios
      .get("http://localhost:8000/api/verify/", { headers })
      .then((res) => {
        // console.log(res);
        if (res.request.status === 200) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!localStorage.access) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

export default ProtectedRoutes;
