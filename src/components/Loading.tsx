import { CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <div className="spinner-container">
      <CircularProgress />
    </div>
  );
}

export default Loading;
