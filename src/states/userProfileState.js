import { atom, selector } from "recoil";
import useUserActions from "../actions/useUserActions";

const userProfileState = atom({
  key: "userProfileState",
  default: selector({
    key: "userProfileState/Default",
    get: async () => {
      const userActions = useUserActions();
      const result = await userActions.getProfileInfo();
      const schoolList = await userActions.getSchoolsList();

      return {
        ...result,
        takeCoursesTime: result.takeCoursesTime
          ? result.takeCoursesTime * 1000
          : Date.now(),
        school: schoolList.find((s) => s.id === result.schoolId),
        entranceYear: new Date(result.entranceYear, 6, 1),
      };
    },
  }),
});

export default userProfileState;
