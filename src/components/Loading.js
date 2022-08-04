import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export function Loading({ open }) {
  return (
    <>
      <Backdrop sx={{ color: "#fff" }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
