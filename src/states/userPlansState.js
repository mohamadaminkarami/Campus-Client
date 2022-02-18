import { atom, selector } from "recoil";
import useUserActions from "../actions/useUserActions";

const userPlansState = atom({
  key: "userPlansState",
  default: selector({
    key: "userPlansState/Default",
    get: async () => (await useUserActions().getPlans()).data,
  }),
});

export default userPlansState;
