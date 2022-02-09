import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useField } from "formik";
import Fuse from "fuse.js";

const schools = [
  { name: "oamp", id: 1 },
  { name: "elec", id: 2 },
  { name: "ssana", id: 3 },
  { name: "kambiz", id: 4 },
  { name: "sll", id: 5 },
  { name: "fard", id: 6 },
  { name: "estim", id: 7 },
  { name: "ali", id: 8 },
  { name: "s9", id: 9 },
  { name: "s10", id: 10 },
  { name: "s11", id: 11 },
  { name: "s12", id: 12 },
];

function filterOptions(fuse) {
  return (options, { inputValue }) => {
    return inputValue !== ""
      ? fuse.search(inputValue).map((i) => i.item)
      : options;
  };
}

function SchoolBoxField({ label, ...props }) {
  const fuse = new Fuse(schools, { keys: ["name"] });

  const [field, meta, fieldHelpers] = useField(props);

  return (
    <>
      <Autocomplete
        getOptionLabel={(option) => option.name}
        {...props}
        {...field}
        disablePortal
        id="combo-box-demo"
        options={schools}
        sx={{ width: "100%" }}
        onChange={(e, value) => {
          fieldHelpers.setValue(value, true);
        }}
        filterOptions={filterOptions(fuse)}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label={label} />
        )}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}
export default SchoolBoxField;
