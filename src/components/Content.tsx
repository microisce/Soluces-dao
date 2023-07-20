import Box from "@mui/material/Box";
import { ContentStyle } from "../pages/dashboard/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FilterButton from "./FilterButton";
import SearchIcon from "@mui/icons-material/Search";
import useDashboardStore from "../store/useDataStore";
import { useLocation } from "react-router-dom";
import Create from "../pages/dashboard/create/Create";
import { useEffect, useState } from "react";
import { getNeedsData } from "../api/Loaders";
import { DataType } from "../types/types";
import NeedsTable from "./NeedsTable";
import { NeedCreationModal } from "./Modals/CreateNeedModal";
import AdminConsole from "./ContentVariations/AdminConsole";
import NeedsContent from "./ContentVariations/NeedsContent";

const Content = () => {
  const location = useLocation();

  if (location.pathname === "/dashboard/besoin") {
    return <NeedsContent />;
  } else if (location.pathname === "/dashboard/create") {
    return <Create />;
  } else if (location.pathname === "/dashboard/admin-console") {
    return <AdminConsole />;
  }
};

export default Content;
