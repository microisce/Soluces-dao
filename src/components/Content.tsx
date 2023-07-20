import { useLocation, useParams } from "react-router-dom";

import Create from "../pages/dashboard/create/Create";
import AdminConsole from "./ContentVariations/AdminConsole";
import NeedsContent from "./ContentVariations/NeedsContent";

const Content = () => {
  const location = useLocation();

  switch (location.pathname) {
    case "/dashboard/besoin":
      return <NeedsContent />;
    case "/dashboard/create/:id":
      return <Create />;
    case "/dashboard/admin-console":
      return <AdminConsole />;
  }
};

export default Content;
