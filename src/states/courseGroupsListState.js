import { selector } from "recoil";
import useUserActions from "../actions/useUserActions";

const courseGroupsListState = selector({
  key: "courseGroupsListState",
  get: async () => {
    const userActions = useUserActions();
    return userActions.getCourseGroupsList();
  },
});

export default courseGroupsListState;
