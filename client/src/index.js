import React from "react";
import ReactDOM from "react-dom/client";
import Register from "./Register.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./css/main.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Index page</h1>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <h1>Login</h1>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
