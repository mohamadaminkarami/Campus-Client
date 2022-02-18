import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import config from "../config";
import userAuthState from "../states/userAuthState";
import ERROR_MESSAGES from "../utils/ERROR_MESSAGES";
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
    getCourseGroupsList,
    getProfileInfo,
    updateProfileInfo,
    getPlans,
    addCourseGroupToPlan,
    deleteCourseGroupFromPlan,
    deletePlan,
    createPlan,
  };

  function _handleError(error) {
    const { response } = error;
    const message = response?.data?.error || error.message;
    console.log({ error: { message, response } });
    if (message === "Network Error") {
      return { status: undefined, message: ERROR_MESSAGES[message] };
    }
  }

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
    try {
      const response = await serverApi.post(SERVER_API_URLS.SIGNUP_PATH, {
        schoolId,
        email,
        entranceYear,
        studentNumber,
        password,
      });

      const { token } = response.data;
      _setUserAuthToken(token);

      navigate(ROUTE_PATHS.HOME, { replace: true });
    } catch (e) {
      _handleError(e);
    }
    return "response";
  }

  async function login({ email, studentNumber, password }) {
    console.log({ login: { email, studentNumber, password } });

    try {
      const response = await serverApi.post(SERVER_API_URLS.LOGIN_PATH, {
        studentNumber,
        password,
      });
      const { token } = response.data;
      _setUserAuthToken(token);
      navigate(ROUTE_PATHS.HOME, { replace: true });
      return "response";
    } catch (e) {
      _handleError(e);
    }
  }

  function logout() {
    console.log("logout called");

    _removeUserAuthToken();
    navigate(ROUTE_PATHS.LOGIN_AND_SIGNUP, { replace: true });
  }

  async function getSchoolsList() {
    console.log("getSchoolsList called");
    try {
      const response = await serverApi.get(SERVER_API_URLS.SCHOOLS_PATH);
      return response?.data?.result || [];
    } catch (e) {
      _handleError(e);
      return [];
    }
  }

  async function getCourseGroupsList() {
    console.log("getCourseGroupsList called");
    try {
      const response = await serverApi.get(SERVER_API_URLS.GROUP_COURSES_PATH, {
        headers: _getAuthHeader(),
      });
      return response.data.result || [];
    } catch (e) {
      _handleError(e);

      return [];
    }
  }

  async function getProfileInfo() {
    console.log("getProfileInfo called");
    try {
      const response = await serverApi.get(SERVER_API_URLS.PROFILE_PATH, {
        headers: _getAuthHeader(),
      });

      return response.data;
    } catch (e) {
      _handleError(e);

      return {};
    }
  }

  async function updateProfileInfo({
    studentNumber,
    email,
    entranceYear,
    schoolId,
    takeCoursesTime,
  }) {
    console.log({
      updateProfileInfo: {
        studentNumber,
        email,
        entranceYear,
        schoolId,
        takeCoursesTime,
      },
    });
    try {
      const response = await serverApi.put(
        SERVER_API_URLS.PROFILE_PATH,
        {
          studentNumber,
          email,
          entranceYear,
          schoolId,
          takeCoursesTime,
        },
        { headers: _getAuthHeader() }
      );
      return {
        alertState: {
          open: true,
          message: "پروفایل شما با موفقیت تغییر کرد.",
          severity: "success",
        },
        data: response.data,
      };
    } catch (e) {
      _handleError(e);

      return {};
    }
  }

  async function getPlans() {
    console.log("getPlans called");
    try {
      const response = await serverApi.get(SERVER_API_URLS.PLANS_PATH + "/", {
        headers: _getAuthHeader(),
      });

      return response.data.result || [];
    } catch (e) {
      _handleError(e);

      return [];
    }
  }

  async function addCourseGroupToPlan({ planId, courseGroupId }) {
    console.log({ addCourseGroupToPlan: { planId, courseGroupId } });

    try {
      const response = await serverApi.post(
        `${SERVER_API_URLS.PLANS_PATH}/${planId}/${courseGroupId}`,
        {},
        { headers: _getAuthHeader() }
      );
      return response.data;
    } catch (e) {
      _handleError(e);

      return {};
    }
  }

  async function deleteCourseGroupFromPlan({ planId, courseGroupId }) {
    console.log({ deletePlan: { planId, courseGroupId } });

    try {
      const response = await serverApi.delete(
        `${SERVER_API_URLS.PLANS_PATH}/${planId}/${courseGroupId}`,
        { headers: _getAuthHeader() }
      );

      return response.data;
    } catch (e) {
      _handleError(e);

      return {};
    }
  }

  async function deletePlan({ planId }) {
    console.log({ deletePlan: { planId } });

    try {
      const response = await serverApi.delete(
        SERVER_API_URLS.PLANS_PATH + "/" + planId,
        { headers: _getAuthHeader() }
      );

      return response.data;
    } catch (e) {
      _handleError(e);
    }
  }

  async function createPlan() {
    console.log("createPlan called");

    try {
      const response = await serverApi.post(
        SERVER_API_URLS.PLANS_PATH + "/",
        {},
        { headers: _getAuthHeader() }
      );
      console.log({ data: response.data });
      return response.data;
    } catch (e) {
      _handleError(e);
    }
  }
}

export default useUserActions;
