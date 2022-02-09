import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import "./App.css";
import RequireAuth from "./components/RequireAuth";
import config from "./config";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";

const { ROUTE_PATHS } = config;

const darkThem = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1a1a1a",
    },
    secondary: { main: "#67a377" },
    primary: { main: "#966a89" },
    text: { primary: "#e0e0e0", secondary: "#919191" },
  },
});

function App() {
  return (
    <div className="App" dir="rtl">
      <ThemeProvider theme={darkThem}>
        <CssBaseline>
          <Routes>
            <Route
              path={ROUTE_PATHS.HOME}
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
            ,
            <Route
              path={ROUTE_PATHS.LOGIN_AND_REGISTER}
              element={<LoginPage />}
            />
            ,
            <Route path="*" element={<NotFoundPage />} />,
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
