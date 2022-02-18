import AdapterJalali from "@date-io/date-fns-jalali";
import { LocalizationProvider } from "@mui/lab";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import RTL from "./components/RTL";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterJalali}>
            <RTL>
              <App />
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
