import getEnvVariable from "../utils/getEnvVariable";

const config = {
  ROUTE_PATHS: {
    HOME: "/plans",
    LOGIN_AND_SIGNUP: "/login",
    PROFILE: "/profile",
    PLANS: "/plans",
  },
  SERVER_API_URLS: {
    BASE_URL: getEnvVariable(
      "REACT_APP_SERVER_BASE_URL",
      "http://localhost:8000/server"
    ),
    LOGIN_PATH: getEnvVariable("REACT_APP_SERVER_LOGIN_PATH", "/auth/login"),
    SIGNUP_PATH: getEnvVariable("REACT_APP_SERVER_SIGNUP_PATH", "/auth/signup"),
    PROFILE_PATH: getEnvVariable("REACT_APP_SERVER_PROFILE_PATH", "/profile/"),
    SCHOOLS_PATH: getEnvVariable("REACT_APP_SERVER_SCHOOLS_PATH", "/schools/"),
    GROUP_COURSES_PATH: getEnvVariable(
      "REACT_APP_SERVER_GROUP_COURSES_PATH",
      "/schools/course-groups"
    ),
    PLANS_PATH: getEnvVariable("REACT_APP_SERVER_PLANS_PATH", "/plans"),
  },
  LOCAL_STORAGE_AUTH_KEY: getEnvVariable(
    "REACT_APP_LOCAL_STORAGE_AUTH_KEY",
    "userAuth"
  ),
};

export default new Proxy(config, {
  get(target, name) {
    if (target[name] === undefined) {
      throw new Error(`Undefined config "${name}" was used.`);
    }
    return target[name];
  },
});
