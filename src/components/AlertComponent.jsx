import { Alert, Snackbar } from "@mui/material";
import PropTypes from "prop-types";

function AlertComponent({ onClose: handleClose, open, message, severity }) {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

AlertComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(["error", "success", "warning", "info"]),
};

export default AlertComponent;
