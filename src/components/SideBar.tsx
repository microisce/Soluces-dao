import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { sideBarStyle } from "../pages/dashboard/styles";
import { linksType } from "../types/types";
import "../pages/dashboard/Home.css";
import React from "react";
import {
  AccountBox,
  AdminPanelSettings,
  List,
  Mail,
  Storage,
} from "@mui/icons-material";

export const links: linksType[] = [
  {
    id: 1,
    path: "/dashboard/besoin",
    text: "Expression de besoin",
    icon: <List />,
  },
  {
    id: 2,
    path: "/dashboard/profil",
    text: "Profil utilisateur",
    icon: <AccountBox />,
  },
  {
    id: 3,
    path: "/dashboard/historique",
    text: "Historique",
    icon: <List />,
  },
  {
    id: 4,
    path: "/dashboard/pointage",
    text: "Pointage",
    icon: <Mail />,
  },
  {
    id: 5,
    path: "/dashboard/data-base",
    text: "Base de données",
    icon: <Storage />,
  },
  {
    id: 6,
    path: "/dashboard/admin-console",
    text: "Console administrateur ",
    icon: <AdminPanelSettings />,
  },
  // {
  //   id: 7,
  //   path: "/dashboard/admin-console",
  //   text: "Famille",
  //   icon: <AdminPanelSettings />,
  // },
];

export const SideBar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={sideBarStyle.container}>
      <Box sx={sideBarStyle.linksContainer}>
        {links.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            {link.text}
          </NavLink>
        ))}
      </Box>
    </Box>
  );
};
