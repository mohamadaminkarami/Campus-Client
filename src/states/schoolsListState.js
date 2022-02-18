import { selector } from "recoil";
import useUserActions from "../actions/useUserActions";

const schoolListState = selector({
  key: "schoolsListState",
  get: async () => {
    const userActions = useUserActions();
    return (await userActions.getSchoolsList()).data;
  },
});

export default schoolListState;
