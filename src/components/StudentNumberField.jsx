import TextField from "@mui/material/TextField";
import { useField } from "formik";
import PropTypes from "prop-types";
import ErrorMessageField from "./ErrorMessageField";

/**
 *
 * @param {{name: string, label: string, id: string}} props
 */
function StudentNumberField(props) {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        margin="normal"
        fullWidth
        variant="standard"
        autoComplete="studentNumber"
        autoFocus
        {...props}
        {...field}
      />
      <ErrorMessageField meta={meta} />
    </>
  );
}

StudentNumberField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default StudentNumberField;
