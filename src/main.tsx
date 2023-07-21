import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import PasswordRestoration from "./pages/auth/PasswordRestoration.tsx";
import Home from "./pages/dashboard/Home.tsx";
import PasswordUpdate from "./pages/auth/PasswordUpdate.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Create from "./pages/dashboard/create/Create.tsx";
import TopBar from "./components/Topbar.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/password-restoration",
    element: <PasswordRestoration />,
  },
  {
    path: "/password-update",
    element: <PasswordUpdate />,
  },
  {
    path: "/dashboard/:content/:id?",
    element: <Home />,
  },

  // {
  //   path: "/dashboard/profil",
  //   element: <h1>profil</h1>,
  // },
  // {
  //   path: "/dashboard/historique",
  //   element: <h1>historique</h1>,
  // },
  // {
  //   path: "/dashboard/pointage",
  //   element: <h1>pointage</h1>,
  // },
  // {
  //   path: "/dashboard/BD",
  //   element: <h1>Base de données</h1>,
  // },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
