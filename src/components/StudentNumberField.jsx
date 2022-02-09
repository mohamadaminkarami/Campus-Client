import TextField from "@mui/material/TextField";
import { useField } from "formik";
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
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}

export default StudentNumberField;
