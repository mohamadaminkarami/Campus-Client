import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import AuthRoutes from "./components/AuthRoutes";
import RequireAuth from "./components/RequireAuth";
import config from "./config";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import darkModeState from "./states/darkModeState";
import darkTheme from "./ui/themes/darkTheme";
import lightTheme from "./ui/themes/lightTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

const { UI_THEME } = config;
const { ROUTE_PATHS } = config;

const useStyles = makeStyles(() => ({
  root: {
    direction: "rtl",
  },
}));

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const classes = useStyles();
  const [isDark, setDarkModeState] = useRecoilState(darkModeState);

  const theme = React.useMemo(
    () => (prefersDarkMode ? setDarkModeState(true) : setDarkModeState(false)),
    [prefersDarkMode]
  );

  console.log("Mode:", isDark, "prefred:", prefersDarkMode);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme} x={theme}>
      <CssBaseline>
        <div className={classes.root}>
          <Routes>
            <Route
              path={ROUTE_PATHS.LOGIN_AND_SIGNUP}
              element={<LoginPage />}
            />

            <Route
              path="*"
              element={
                <RequireAuth>
                  <AuthRoutes />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
