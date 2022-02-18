import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useField } from "formik";
import Fuse from "fuse.js";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import schoolListState from "../states/schoolsListState";
import ErrorMessageField from "./ErrorMessageField";

function SchoolBoxField({ notSetDefaultValue, ...props }) {
  const schoolsList = useRecoilValue(schoolListState);

  const fuse = useMemo(() => {
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
      fieldHelpers.setValue(schoolsList[0] || "", true);
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
        noOptionsText="دانشکده‌ای با این نام وجود نداره :("
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
