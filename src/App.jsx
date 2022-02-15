import { Route, Routes } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./components/RequireAuth";
import config from "./config";
import AuthRoutes from "./components/AuthRoutes";

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
        <Route path={ROUTE_PATHS.LOGIN_AND_REGISTER} element={<LoginPage />} />

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
  );
}

export default App;
