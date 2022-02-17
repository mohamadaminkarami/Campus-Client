import { atom, selector } from "recoil";
import userPlansState from "./userPlansState";

const pageSelectionState = atom({
  key: "pageSelectionState",
  default: selector({
    key: "pageSelectionState/Default",
    get: ({ get }) => {
      const firstPlan = get(userPlansState)[0];
      return {
        planTabIndex: firstPlan ? 0 : undefined,
        schoolId: undefined,
        courseGroupId: undefined,
        hoveredCourseGroup: undefined,
        planId: firstPlan?.id || undefined,
      };
    },
  }),
});

export default pageSelectionState;
