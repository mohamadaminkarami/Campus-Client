import { createTheme } from "@mui/material";
import { faIR } from "@mui/material/locale";

const darkTheme = createTheme({
  direction: "rtl",
  palette: {
    common: { black: "#000", white: "#fff" },
    mode: "dark",
    background: {
      paper: "rgba(30, 30, 30, 1)",
      default: "rgba(45, 45, 45, 1)",
    },
    primary: {
      light: "rgba(220, 220, 170, 1)",
      main: "rgba(255, 204, 0, 1)",
      dark: "rgba(219, 183, 39, 1)",
      contrastText: "rgba(33, 33, 33, 1)",
    },
    secondary: {
      light: "rgba(0, 0, 0, 0.76)",
      main: "rgba(19, 19, 19, 1)",
      dark: "rgba(0, 0, 0, 1)",
      contrastText: "rgba(223, 223, 223, 1)",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(229, 229, 229, 1)",
      secondary: "rgba(168, 168, 168, 1)",
      disabled: "rgba(229, 229, 229, 0.45)",
      hint: "rgba(229, 229, 229, 0.49)",
    },
  },
  typography: {
    fontSize: 17,
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
  },
  faIR,
});

export default darkTheme;
