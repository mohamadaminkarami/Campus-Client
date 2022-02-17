import { atom, selector } from "recoil";
import useUserActions from "../actions/useUserActions";
import isAddPlanState from "./isAddPlanState";
import pageSelectionState from "./pageSelectionState";

const userPlansState = atom({
  key: "userPlansState",
  default: selector({
    key: "userPlansState/Default",
    get: () => useUserActions().getPlans(),
  }),
});

// const userPlansState = selector({
//   key: "userPlansState",
//   get: async () => useUserActions().getPlans(),

// set: ({ set }, newValue) => set(tempFahrenheit, newValue),

// set: ({ set, get }, newPlans) => {
//   console.log({ newPlans });
//   const isAddPlan = get(isAddPlanState);
//   console.log({ isAddPlan });

//   if (isAddPlan === true) {
//     const lastIndex = newPlans.length - 1;
//     const lastPlan = newPlans[newPlans.length - 1];

//     set(pageSelectionState, {
//       ...get(pageSelectionState),
//       planTabIndex: lastPlan ? lastIndex : undefined,
//       planId: lastPlan?.id,
//     });
//   } else if (isAddPlan === false) {
//     const lastTabIndex = get(pageSelectionState).planTabIndex;
//     const validIndex =
//       lastTabIndex >= newPlans.length ? newPlans.length - 1 : lastTabIndex;
//     set(pageSelectionState, {
//       ...get(pageSelectionState),
//       planTabIndex: validIndex,
//       planId: newPlans[validIndex]?.id,
//     });
//   }
// },
// });

export default userPlansState;
