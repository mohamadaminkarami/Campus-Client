import React, { useCallback } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useField } from "formik";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import schoolListState from "../states/schoolListState";
import schoolFuseState from "../states/schoolFuseState";
import ErrorMessageField from "./ErrorMessageField";

function SchoolBoxField(props) {
  const schoolsList = useRecoilValue(schoolListState);
  const fuse = useRecoilValue(schoolFuseState);

  const filterOptions = useCallback(
    (options, { inputValue }) => {
      return inputValue ? fuse.search(inputValue).map((i) => i.item) : options;
    },
    [fuse]
  );

  const [field, meta, fieldHelpers] = useField(props);

  return (
    <>
      <Autocomplete
        getOptionLabel={(option) => option?.name || option}
        {...props}
        {...field}
        disablePortal
        id="schoolBox"
        options={schoolsList}
        sx={{ width: "100%" }}
        onChange={(e, value) => {
          fieldHelpers.setValue(value, true);
        }}
        filterOptions={filterOptions}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label={props.label} />
        )}
      />
      <ErrorMessageField meta={meta} />
    </>
  );
}

SchoolBoxField.propTypes = {
  label: PropTypes.string,
};

export default SchoolBoxField;
