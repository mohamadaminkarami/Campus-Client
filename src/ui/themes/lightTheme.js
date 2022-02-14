import { createTheme } from "@mui/material";
import { faIR } from "@mui/material/locale";

const lightTheme = createTheme({
  direction: "rtl",
  palette: {
    common: { black: "#0000", white: "#ffff" },
    mode: "light",
  },
  typography: {
    fontFamily: [
      '"B Nazanin"',
      "Shabnam",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 18,
  },
  faIR,
});

export default lightTheme;
