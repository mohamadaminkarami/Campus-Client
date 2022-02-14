import React from "react";
import ReactDOM from "react-dom";
import AdapterJalali from "@date-io/date-fns-jalali";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/lab";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@emotion/react";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import reportWebVitals from "./reportWebVitals";
import RTL from "./components/RTL";
import lightTheme from "./ui/themes/lightTheme";
import darkTheme from "./ui/themes/darkTheme";
import "./index.css";
import config from "./config";

const { UI_THEME } = config;

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterJalali}>
            <RTL>
              <ThemeProvider
                theme={UI_THEME === "dark" ? darkTheme : lightTheme}
              >
                <CssBaseline>
                  <App />
                </CssBaseline>
              </ThemeProvider>
            </RTL>
          </LocalizationProvider>
        </BrowserRouter>
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
