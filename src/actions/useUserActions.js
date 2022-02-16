import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import config from "../config";
import userAuthState from "../states/userAuthState";
import serverApi from "../utils/serverApi";

const { LOCAL_STORAGE_AUTH_KEY, SERVER_API_URLS, ROUTE_PATHS } = config;

function useUserActions() {
  const [userAuth, setUserAuth] = useRecoilState(userAuthState);
  const navigate = useNavigate();

  return {
    signup,
    login,
    logout,
    getSchoolsList,
    getGroupCoursesList,
    getProfileInfo,
    updateProfileInfo,
    getPlans,
    updatePlan,
    deletePlan,
    createPlan,
  };

  function _setUserAuthToken(token) {
    setUserAuth(token);
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(token));
  }

  function _removeUserAuthToken() {
    setUserAuth(null);
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  }

  function _getAuthHeader() {
    return userAuth ? { Authorization: `Token ${userAuth}` } : {};
  }

  async function signup({
    schoolId,
    email,
    entranceYear,
    studentNumber,
    password,
  }) {
    console.log({
      signup: { schoolId, email, entranceYear, studentNumber, password },
    });

    const token = "test";
    // const response = await serverApi.post(SERVER_API_URLS.SIGNUP_PATH, {
    //   schoolId,
    //   email,
    //   entranceYear,
    //   studentNumber,
    //   password,
    // });
    // const { token } = response.data;
    _setUserAuthToken(token);
    navigate(ROUTE_PATHS.HOME, { replace: true });
    return "response";
  }

  async function login({ email, studentNumber, password }) {
    console.log({ login: { email, studentNumber, password } });
    // const response = await serverApi.post(SERVER_API_URLS.LOGIN_PATH, {
    //   studentNumber,
    //   password,
    // });
    const token = "test";
    _setUserAuthToken(token);
    navigate(ROUTE_PATHS.HOME, { replace: true });
    return "response";
  }

  function logout() {
    console.log("logout called");
    _removeUserAuthToken();
    navigate(ROUTE_PATHS.LOGIN_AND_SIGNUP, { replace: true });
  }

  async function getSchoolsList() {
    console.log("getSchoolsList called");
    // const response = await serverApi.get(SERVER_API_URLS.SCHOOLS_PATH);
    // return response;
    return [
      { id: 1, name: "مهندسی کامپیوتر" },
      { id: 2, name: "مهندسی صنایع" },
      { id: 3, name: "مهندسی برق" },
      { id: 4, name: "مهندسی عمران" },
      { id: 5, name: "مرکز معارف" },
      { id: 6, name: "مرکز تربیت بدنی" },
      { id: 7, name: "ریاضی" },
      { id: 8, name: "فیزیک" },
      { id: 9, name: "کارگاه‌ها" },
      { id: 10, name: "مهندسی و علم مواد‍" },
    ];
  }

  async function getGroupCoursesList() {
    console.log("getGroupCoursesList called");

    // const response = await serverApi.get(SERVER_API_URLS.GROUP_COURSES_PATH, {
    //   headers: _getAuthHeader(),
    // });
    // return response;

    return [
      {
        schoolId: 1,
        schoolName: "مهندسی کامپیوتر",
        groupCourses: [
          {
            id: 1,
            professor: { id: 1, name: "محمدافشین همت‌یار" },
            course: {
              id: 1,
              code: 10001,
              name: "آمار و احتمال",
              credit: 3,
              school: 1,
            },

            groupNumber: 1,
            detail: "غیر حضوری",
            takeChance: 70.3,
            time: [
              { day: 0, startTime: 8, endTime: 9.5 },
              { day: 2, startTime: 8, endTime: 9.5 },
            ],
          },
          {
            id: 2,
            professor: { id: 3, name: "مسیح بیگی‌ریزی" },
            course: {
              id: 2,
              code: 10001,
              name: "مبانی برنامه نویسی",
              credit: 2,
            },

            groupNumber: 2,
            detail: "غیر حضوری",
            takeChance: 50.3,
            time: [
              { day: 0, startTime: 9, endTime: 10.5 },
              { day: 2, startTime: 8, endTime: 9.5 },
            ],
          },

          {
            id: 3,
            professor: { id: 3, name: "مسیح بیگی‌ریزی" },
            course: {
              id: 2,
              code: 20001,
              name: "۲ مبانی برنامه نویسی",
              credit: 2,
            },

            groupNumber: 2,
            detail: "غیر حضوری",
            takeChance: 50.3,
            time: [
              { day: 1, startTime: 12, endTime: 14.5 },
              { day: 3, startTime: 12, endTime: 14.5 },
            ],
          },
        ],
      },
      {
        schoolId: 2,
        schoolName: "مهندسی صنایع",
        groupCourses: [
          {
            id: 1,
            professor: { id: 1, name: "محمدافشین همت‌یار" },
            course: {
              id: 1,
              code: 10001,
              name: "آمار و احتمال",
              credit: 3,
              school: 1,
            },

            groupNumber: 1,
            detail: "غیر حضوری",
            takeChance: 70.3,
            time: [
              { day: 0, startTime: 8, endTime: 9.5 },
              { day: 2, startTime: 8, endTime: 9.5 },
            ],
          },
          {
            id: 2,
            professor: { id: 3, name: "مسیح بیگی‌ریزی" },
            course: {
              id: 2,
              code: 10001,
              name: "مبانی برنامه نویسی",
              credit: 2,
            },

            groupNumber: 2,
            detail: "غیر حضوری",
            takeChance: 50.3,
            time: [
              { day: 0, startTime: 9, endTime: 10.5 },
              { day: 2, startTime: 8, endTime: 9.5 },
            ],
          },
        ],
      },
      { schoolId: 3, schoolName: "مهندسی برق", groupCourses: [] },
      { schoolId: 4, schoolName: "مهندسی عمران", groupCourses: [] },
      { schoolId: 5, schoolName: "مرکز معارف", groupCourses: [] },
      { schoolId: 6, schoolName: "مرکز تربیت بدنی", groupCourses: [] },
      { schoolId: 7, schoolName: "ریاضی", groupCourses: [] },
      { schoolId: 8, schoolName: "فیزیک", groupCourses: [] },
      { schoolId: 9, schoolName: "کارگاه‌ها", groupCourses: [] },
      { schoolId: 10, schoolName: "مهندسی علم مواد‍", groupCourses: [] },
      { schoolId: 11, schoolName: "مهندسی هوافضا ", groupCourses: [] },
      { schoolId: 12, schoolName: "زبان ها", groupCourses: [] },
    ];
  }

  async function getProfileInfo() {
    console.log("getProfileInfo called");
    // const response = await serverApi.get(SERVER_API_URLS.PROFILE_PATH, {
    //   headers: _getAuthHeader(),
    // });
    // return response;

    return {
      studentNumber: "98105998",
      email: "kambiz@gmail.com",
      password: "12345",
      entranceYear: 2019,
      schoolId: 1,
      takeCoursesTime: 1644917298,
    };
  }

  async function updateProfileInfo({
    studentNumber,
    email,
    password,
    entranceYear,
    schoolId,
    takeCoursesTime,
  }) {
    console.log({
      updateProfileInfo: {
        studentNumber,
        email,
        password,
        entranceYear,
        schoolId,
        takeCoursesTime,
      },
    });
    // const response = await serverApi.put(
    //   SERVER_API_URLS.PROFILE_PATH,
    //   {
    //     studentNumber,
    //     email,
    //     password,
    //     entranceYear,
    //     schoolId,
    //     takeCoursesTime,
    //   },
    //   { headers: _getAuthHeader() }
    // );
    // return response
    return {
      studentNumber,
      email,
      password,
      entranceYear,
      schoolId,
      takeCoursesTime,
    };
  }

  async function getPlans() {
    console.log("getPlans called");
    // const response = await serverApi.get(SERVER_API_URLS.PLANS_PATH, {
    //   headers: _getAuthHeader(),
    // });
    return [
      { id: 1, groupCourses: [1, 2, 3] },
      { id: 2, groupCourses: [2, 3] },
      { id: 3, groupCourses: [1, 2] },
      { id: 4, groupCourses: [2] },
      { id: 5, groupCourses: [1] },
      { id: 6, groupCourses: [] },
    ];
  }

  async function updatePlan({ planId, groupCourses }) {
    console.log({ updatePlan: { planId, groupCourses } });
    //   const response = await serverApi.put(
    //     `${SERVER_API_URLS.PLANS_PATH}/${planId}`,
    //     { groupCourses },
    //     { headers: _getAuthHeader() }
    //   );
    //   return response;
    return { id: planId, groupCourses };
  }

  async function deletePlan({ planId }) {
    console.log({ deletePlan: { planId } });
    // const response = await serverApi.delete(
    //   `${SERVER_API_URLS.PLANS_PATH}/${planId}`,
    //   { headers: _getAuthHeader() }
    // );

    // return response;
    return "response";
  }

  async function createPlan() {
    console.log("createPlan called");
    // const response = await serverApi.post(
    //   SERVER_API_URLS.PLANS_PATH,
    //   {},
    //   { headers: _getAuthHeader() }
    // );

    return "response";
  }
}

export default useUserActions;
