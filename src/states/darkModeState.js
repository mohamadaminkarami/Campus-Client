import { atom } from "recoil";

const darkModeState = atom({
  key: "darkModeState",
  default: true,
});

export default darkModeState;
