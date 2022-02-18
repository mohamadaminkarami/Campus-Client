import { atom } from "recoil";

const loginPageAlertState = atom({
  key: "loginPageAlertState",
  default: { open: false, message: "", severity: "error" },
});
export default loginPageAlertState;
