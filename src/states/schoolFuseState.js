import { selector } from "recoil";
import Fuse from "fuse.js";
import schoolListState from "./schoolListState";

const schoolFuseState = selector({
  key: "schoolFuseState",
  get: async ({ get }) => {
    return new Fuse(get(schoolListState), { keys: ["name"] });
  },
});

export default schoolFuseState;
