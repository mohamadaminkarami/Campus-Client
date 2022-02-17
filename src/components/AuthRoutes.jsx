import { Navigate, Route, Routes } from "react-router-dom";
import config from "../config";
import HomePage from "../pages/HomePage";
import PlansPage from "../pages/PlansPage";
import ProfilePage from "../pages/ProfilePage";
import MainAppbar from "./MainAppbar";
const { ROUTE_PATHS } = config;
function AuthRoutes() {
  return (
    <>
      <MainAppbar />
      <Routes>
        <Route path={ROUTE_PATHS.PLANS} element={<PlansPage />} />
        <Route path={ROUTE_PATHS.PROFILE} element={<ProfilePage />} />
        <Route
          path="*"
          element={<Navigate to={ROUTE_PATHS.LOGIN_AND_SIGNUP} replace />}
        />
      </Routes>
    </>
  );
}

export default AuthRoutes;
