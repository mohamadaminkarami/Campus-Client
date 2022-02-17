import { DatePicker, DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import { useField } from "formik";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import schoolListState from "../states/schoolsListState";
import userProfileState from "../states/userProfileState";
import ErrorMessageField from "./ErrorMessageField";

/**
 *
 * @param {{id: string, name: string, label: string, disableFuture: boolean}} props
 */

function CustomDateTimePicker(props) {
  const [field, meta, fieldHelpers] = useField(props);

  return (
    <>
      <DateTimePicker
        minDateTime={new Date()}
        views={["month", "day", "hours", "minutes"]}
        mask={"__/____ __:__"}
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

CustomDateTimePicker.propTypes = {
  views: PropTypes.arrayOf(PropTypes.string),
};

export default CustomDateTimePicker;
