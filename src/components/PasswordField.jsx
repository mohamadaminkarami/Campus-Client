import TextField from "@mui/material/TextField";
import { useField } from "formik";

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
        required
        fullWidth
        type="password"
        autoComplete="current-password"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}

export default PasswordField;
