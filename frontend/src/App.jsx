import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login-admin.jsx";
import AdminDashb from "./components/AdminDashb.jsx";
import UserDashb from "./components/UserDashb.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <AdminDashb />,
    },
    {
      path: "/user",
      element: <UserDashb />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
