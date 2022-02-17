import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import config from "../config";
import userAuthState from "../states/userAuthState";
import serverApi from "../utils/serverApi";
let counter = 0;
let PLANS = [];

const { LOCAL_STORAGE_AUTH_KEY, SERVER_API_URLS, ROUTE_PATHS } = config;

function useUserActions() {
  const [userAuth, setUserAuth] = useRecoilState(userAuthState);
  const navigate = useNavigate();

  return {
    signup,
    login,
    logout,
    getSchoolsList,
    getCourseGroupsList,
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

  async function getCourseGroupsList() {
    console.log("getCourseGroupsList called");

    // const response = await serverApi.get(SERVER_API_URLS.GROUP_COURSES_PATH, {
    //   headers: _getAuthHeader(),
    // });
    // return response;

    return [
      {
        schoolId: 1,
        schoolName: "مهندسی کامپیوتر",
        courseGroups: [
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
            capacity: 50,
            examDate: 1645084040,
            takeChance: 70.3,
            detail: "غیر حضوری",
            schedule: [
              { day: 0, startTime: 8, endTime: 9.5 },
              { day: 2, startTime: 8, endTime: 9.5 },
            ],
          },
          {
            id: 2,
            professor: { id: 3, name: "مسیح بیگی‌ریزی" },
            course: {
              id: 2,
              code: 10002,
              name: "مبانی برنامه نویسی",
              credit: 2,
              school: 1,
            },

            groupNumber: 2,
            capacity: 50,
            examDate: 1648084040,
            takeChance: 50.3,
            detail: "غیر حضوری برگزار می‌شود.",
            schedule: [
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
            capacity: 70,
            examDate: 1641084040,
            detail: "غیر حضوری",
            takeChance: 50.3,
            schedule: [
              { day: 1, startTime: 12, endTime: 14.5 },
              { day: 3, startTime: 12, endTime: 14.5 },
            ],
          },
        ],
      },
      {
        schoolId: 2,
        schoolName: "مهندسی صنایع",
        courseGroups: [
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
            capacity: 70,
            examDate: 1641084040,
            schedule: [
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
            capacity: 30,
            examDate: 1641084040,
            takeChance: 50.3,
            schedule: [
              { day: 0, startTime: 9, endTime: 10.5 },
              { day: 2, startTime: 8, endTime: 9.5 },
            ],
          },
        ],
      },
      { schoolId: 3, schoolName: "مهندسی برق", courseGroups: [] },
      { schoolId: 4, schoolName: "مهندسی عمران", courseGroups: [] },
      { schoolId: 5, schoolName: "مرکز معارف", courseGroups: [] },
      { schoolId: 6, schoolName: "مرکز تربیت بدنی", courseGroups: [] },
      { schoolId: 7, schoolName: "ریاضی", courseGroups: [] },
      { schoolId: 8, schoolName: "فیزیک", courseGroups: [] },
      { schoolId: 9, schoolName: "کارگاه‌ها", courseGroups: [] },
      { schoolId: 10, schoolName: "مهندسی علم مواد‍", courseGroups: [] },
      { schoolId: 11, schoolName: "مهندسی هوافضا ", courseGroups: [] },
      { schoolId: 12, schoolName: "زبان ها", courseGroups: [] },
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
    return [...PLANS];
  }

  async function updatePlan({ planId, courseGroups }) {
    console.log({ updatePlan: { planId, courseGroups } });
    PLANS = PLANS.filter((p) => p.id !== planId).push({
      id: planId,
      courseGroups,
    });
    //   const response = await serverApi.put(
    //     `${SERVER_API_URLS.PLANS_PATH}/${planId}`,
    //     { courseGroups },
    //     { headers: _getAuthHeader() }
    //   );
    //   return response;
    return { id: planId, courseGroups };
  }

  async function deletePlan({ planId }) {
    console.log({ deletePlan: { planId } });
    PLANS = PLANS.filter((p) => p.id !== planId);
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
    const plan = { id: 2 * ++counter, courseGroups: [1] };
    PLANS.push(plan);
    return plan;
  }
}

export default useUserActions;
