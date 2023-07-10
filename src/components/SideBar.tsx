import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { sideBarStyle } from "../pages/dashboard/styles";
import { linksType } from "../types/types";
import "../pages/dashboard/Home.css";

const links: linksType[] = [
  {
    id: 1,
    path: "/dashboard/besoin",
    text: "Expression de besoin",
  },
  {
    id: 2,
    path: "/dashboard/profil",
    text: "Profil utilisateur",
  },
  {
    id: 3,
    path: "/dashboard/historique",
    text: "Historique",
  },
  {
    id: 4,
    path: "/dashboard/pointage",
    text: "Pointage",
  },
  {
    id: 5,
    path: "/dashboard/BD",
    text: "Base de données",
  },
  {
    id: 6,
    path: "/dashboard/admin-console",
    text: "Console administrateur Identifiant",
  },
];

export const SideBar = () => {
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
