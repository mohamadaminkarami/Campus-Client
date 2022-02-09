import { Navigate, useLocation } from "react-router-dom";

import config from "../config";

const { ROUTE_PATHS } = config;

function RequireAuth({ children }) {
  const auth = false;
  const location = useLocation();

  return auth ? (
    children
  ) : (
    <Navigate
      to={ROUTE_PATHS.LOGIN_AND_REGISTER}
      state={{ from: location }}
      replace
    />
  );
}

export default RequireAuth;
