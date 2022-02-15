import TextField from "@mui/material/TextField";
import { useField } from "formik";
import ErrorMessageField from "./ErrorMessageField";

/**
 *
 * @param {{name: string, label: string, id: string}} props
 */

function PasswordField(props) {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        margin="normal"
        variant="standard"
        fullWidth
        type="password"
        autoComplete="new-password"
        {...field}
        {...props}
      />
      <ErrorMessageField meta={meta} />
    </>
  );
}

export default PasswordField;
