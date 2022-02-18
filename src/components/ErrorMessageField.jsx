/* eslint-disable react/prop-types */

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  error: {
    color: "red",
  },
}));

function ErrorMessageField({ meta }) {
  const classes = useStyles();
  return (
    <>
      {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
      ) : (
        <div style={{ visibility: "hidden" }}>empty</div>
      )}
    </>
  );
}

export default ErrorMessageField;
