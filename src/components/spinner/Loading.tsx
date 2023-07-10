import { CircularProgress } from "@mui/material";
import "./loader.css";

function Loading() {
  return (
    <>
      <div className="blurred-background"></div>

      <div className="spinner-container">
        <CircularProgress />
        <h2>Vérification...</h2>
      </div>
    </>
  );
}

export default Loading;
