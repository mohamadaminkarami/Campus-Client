import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import config from "../config";
import userAuthState from "../states/userAuthState";
import serverApi from "../utils/serverApi";
const { LOCAL_STORAGE_AUTH_KEY, SERVER_API_URLS, ROUTE_PATHS } = config;

function useUserActions() {
  const [userAuth, setUserAuth] = useRecoilState(userAuthState);
  const navigate = useNavigate();

  return { login, logout, register, getSchoolsList };

  function setUserAuthToken(token) {
    setUserAuth(token);
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(token));
  }

  async function getSchoolsList() {
    const response = await serverApi.get(SERVER_API_URLS.SCHOOLS);
    return response;
  }
  function removeUserAuthToken() {
    setUserAuth(null);
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  }

  function getAuthHeader() {
    return userAuth ? { Authorization: userAuth } : {};
  }

  async function login({ email, studentNumber, password }) {
    const response = await serverApi.post(
      SERVER_API_URLS.LOGIN_PATH,
      { email, studentNumber, password },
      { headers: getAuthHeader() }
    );

    return response;
  }

  function logout() {
    removeUserAuthToken();
    navigate(ROUTE_PATHS.LOGIN_AND_REGISTER, { replace: true });
  }

  async function register({
    school,
    entranceYear,
    email,
    studentNumber,
    password,
  }) {
    const response = await serverApi.post(SERVER_API_URLS.REGISTER_PATH, {
      school,
      entranceYear,
      email,
      studentNumber,
      password,
    });
    const { token } = response.data;
    setUserAuthToken(token);
    return response;
  }
}

export default useUserActions;
