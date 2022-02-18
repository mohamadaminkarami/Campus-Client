import { atom } from "recoil";

const profilePageAlertState = atom({
  key: "profilePageAlertState",
  default: { open: false, message: "", severity: "error" },
});
export default profilePageAlertState;
