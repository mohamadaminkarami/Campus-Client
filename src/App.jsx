import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import AuthRoutes from "./components/AuthRoutes";
import RequireAuth from "./components/RequireAuth";
import config from "./config";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import darkModeState from "./states/darkModeState";
import darkTheme from "./ui/themes/darkTheme";
import lightTheme from "./ui/themes/lightTheme";

const { UI_THEME } = config;
const { ROUTE_PATHS } = config;

const useStyles = makeStyles(() => ({
  root: {
    direction: "rtl",
  },
}));

function App() {
  const classes = useStyles();
  const isDark = useRecoilValue(darkModeState);

  console.log("Mode:", darkModeState);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
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
