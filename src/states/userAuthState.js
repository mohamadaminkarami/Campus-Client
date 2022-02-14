import { atom } from "recoil";
import config from "../config";
const { LOCAL_STORAGE_AUTH_KEY } = config;

const userAuthState = atom({
  key: "userAuthState",
  default: JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)),
});

export default userAuthState;
