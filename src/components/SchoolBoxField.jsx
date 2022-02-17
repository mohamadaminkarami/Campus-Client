import React, { useCallback, useEffect, useMemo } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useField } from "formik";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import Fuse from "fuse.js";
import schoolListState from "../states/schoolsListState";
import ErrorMessageField from "./ErrorMessageField";

function SchoolBoxField({ notSetDefaultValue, ...props }) {
  const schoolsList = useRecoilValue(schoolListState);

  const fuse = useMemo(() => {
    console.log("SchoolBoxField fuse called");
    return new Fuse(schoolsList, { keys: ["name"] });
  }, [schoolsList]);

  const filterOptions = useCallback(
    (options, { inputValue }) => {
      return inputValue ? fuse.search(inputValue).map((i) => i.item) : options;
    },
    [fuse]
  );

  const [field, meta, fieldHelpers] = useField(props);

  useEffect(() => {
    if (!notSetDefaultValue) {
      fieldHelpers.setValue(schoolsList[1] || "", true);
    }
  }, [schoolsList]);

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
  notSetDefaultValue: PropTypes.bool,
};

export default SchoolBoxField;
