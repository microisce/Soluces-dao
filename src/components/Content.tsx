import { useLocation, useParams, useSearchParams } from "react-router-dom";

import Details from "../pages/dashboard/create/Details";
import AdminConsole from "./ContentVariations/AdminConsole";
import NeedsContent from "./ContentVariations/NeedsContent";
import { Typography } from "@mui/material";

const Content = () => {
  const location = useLocation();
  // console.log(params.keys());

  switch (location.pathname) {
    case "/dashboard/besoin":
      return <NeedsContent />;
    case "/dashboard/details":
      return <Details />;
    case "/dashboard/admin-console":
      return <AdminConsole />;

    default:
      <Typography>Page en cours de construction</Typography>;
  }
};

export default Content;
