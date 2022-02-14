import { DatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import { useField } from "formik";
import PropTypes from "prop-types";
import ErrorMessageField from "./ErrorMessageField";

/**
 *
 * @param {{id: string, name: string, label: string, disableFuture: boolean}} props
 */

function getMask(views) {
  let mask = "";
  if ("year" in views) {
    mask += "____/";
  }
  if ("month" in views) {
    mask += "__/";
  }
  if ("day" in views) {
    mask += "__/";
  }
  return mask;
}

function CustomDatePicker(props) {
  const [field, meta, fieldHelpers] = useField(props);
  return (
    <>
      <DatePicker
        mask={getMask(props.views)}
        {...props}
        {...field}
        onChange={(value) => {
          fieldHelpers.setValue(value, true);
        }}
        renderInput={(params) => (
          <TextField {...params} variant="standard" fullWidth color="primary" />
        )}
      />
      <ErrorMessageField meta={meta} />
    </>
  );
}

CustomDatePicker.propTypes = {
  views: PropTypes.arrayOf(PropTypes.string),
};

export default CustomDatePicker;
