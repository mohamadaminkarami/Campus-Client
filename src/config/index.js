import getEnvVariable from "../utils/getEnvVariable";

const config = {
  ROUTE_PATHS: {
    HOME: "/",
    LOGIN_AND_REGISTER: "/login",
    PROFILE: "/profile",
    PLANS: "/plans",
  },
  SERVER_API_URLS: {
    BASE_URL: getEnvVariable("SERVER_BASE_URL", "http://localhost:8000"),
    LOGIN_PATH: getEnvVariable("SERVER_LOGIN_PATH", "/users/login"),
    REGISTER_PATH: getEnvVariable("SERVER_REGISTER_PATH", "/users/register"),
    SCHOOLS: getEnvVariable("SERVER_SCHOOLS", "/schools"),
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
