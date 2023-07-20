import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

type DeleteButtonProp = {
  onClick: () => void;
};

const DeleteButton = ({ onClick }: DeleteButtonProp) => {
  return (
    <Button onClick={onClick}>
      <CloseIcon sx={{ color: "red" }} />
    </Button>
  );
};

export default DeleteButton;
