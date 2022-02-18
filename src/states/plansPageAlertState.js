import { atom } from "recoil";

const PlansPageAlertState = atom({
  key: "PlansPageAlertState",
  default: { open: false, message: "", severity: "error" },
});
export default PlansPageAlertState;
