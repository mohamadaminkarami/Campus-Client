import getEnvVariable from "../utils/getEnvVariable";

const config = {
  ROUTE_PATHS: {
    HOME: "/",
    LOGIN_AND_SIGNUP: "/login",
    PROFILE: "/profile",
    PLANS: "/plans",
  },
  SERVER_API_URLS: {
    BASE_URL: getEnvVariable("SERVER_BASE_URL", "http://localhost:8080"),
    LOGIN_PATH: getEnvVariable("SERVER_LOGIN_PATH", "/auth/login"),
    SIGNUP_PATH: getEnvVariable("SERVER_SIGNUP_PATH", "/auth/signup"),
    PROFILE_PATH: getEnvVariable("SERVER_PROFILE_PATH", "/profile"),
    SCHOOLS_PATH: getEnvVariable("SERVER_SCHOOLS_PATH", "/schools"),
    GROUP_COURSES_PATH: getEnvVariable(
      "SERVER_GROUP_COURSES_PATH",
      "/groupCourses"
    ),
    PLANS_PATH: getEnvVariable("SERVER_PLANS_PATH", "/plans"),
  },
  LOCAL_STORAGE_AUTH_KEY: getEnvVariable("LOCAL_STORAGE_AUTH_KEY", "userAuth"),
  UI_THEME: getEnvVariable("UI_THEME", "dark"),
};

export default new Proxy(config, {
  get(target, name) {
    if (target[name] === undefined) {
      throw new Error(`Undefined config "${name}" was used.`);
    }
    return target[name];
  },
});
