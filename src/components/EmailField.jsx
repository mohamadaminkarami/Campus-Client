import TextField from "@mui/material/TextField";
import { useField } from "formik";
import ErrorMessageField from "./ErrorMessageField";

/**
 *
 * @param {{name: string, label: string, id: string}} props
 */

function EmailField(props) {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        margin="normal"
        variant="standard"
        fullWidth
        autoComplete="email"
        {...props}
        {...field}
      />
      <ErrorMessageField meta={meta} />
    </>
  );
}

export default EmailField;
