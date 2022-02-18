import { ThemeProvider } from "@emotion/react";
import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
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

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme} x={theme}>
      <CssBaseline>
        <React.Suspense
          fallback={
            <CircularProgress
              style={{
                left: "50%",
                top: "50%",
                position: "absolute",
                transform: "translate(-50%, -50%)",
              }}
            />
          }
        >
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
        </React.Suspense>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
