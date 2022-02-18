import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import config from "../config";
import userAuthState from "../states/userAuthState";

const { ROUTE_PATHS } = config;

function RequireAuth({ children }) {
  const auth = useRecoilValue(userAuthState);
  const location = useLocation();

  return auth ? (
    children
  ) : (
    <Navigate
      to={ROUTE_PATHS.LOGIN_AND_SIGNUP}
      state={{ from: location }}
      replace
    />
  );
}

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RequireAuth;
