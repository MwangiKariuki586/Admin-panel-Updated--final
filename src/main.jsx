import React from "react";
import ReactDOM from "react-dom/client";
import UserContextProvider from "./context/UserContextProvider.jsx";
import App from "./App.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
