import { Navigate, Route, Routes } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./components/RequireAuth";
import config from "./config";

const { ROUTE_PATHS } = config;

const useStyles = makeStyles(() => ({
  root: {
    direction: "rtl",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Routes>
        <Route
          path={ROUTE_PATHS.HOME}
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route path={ROUTE_PATHS.LOGIN_AND_REGISTER} element={<LoginPage />} />
        <Route
          path="*"
          element={<Navigate to={ROUTE_PATHS.LOGIN_AND_REGISTER} replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
