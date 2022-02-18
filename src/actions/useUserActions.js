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

  function _getErrorAlertState(error) {
    const { response } = error;
    const message = response?.data?.error || error.message;

    return {
      alertState: {
        open: true,
        message: ERROR_MESSAGES[message] || message,
        severity: "error",
      },
      error: true,
    };
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
      return {};
    } catch (e) {
      return { ..._getErrorAlertState(e) };
    }
  }

  async function login({ studentNumber, password }) {
    try {
      const response = await serverApi.post(SERVER_API_URLS.LOGIN_PATH, {
        studentNumber,
        password,
      });
      const { token } = response.data;
      _setUserAuthToken(token);
      return {};
    } catch (e) {
      return { ..._getErrorAlertState(e) };
    }
  }

  function logout() {
    _removeUserAuthToken();
    navigate(ROUTE_PATHS.LOGIN_AND_SIGNUP, { replace: true });
  }

  async function getSchoolsList() {
    try {
      const response = await serverApi.get(SERVER_API_URLS.SCHOOLS_PATH);
      return { data: response?.data?.result || [] };
    } catch (e) {
      return { ..._getErrorAlertState(e), data: [] };
    }
  }

  async function getCourseGroupsList() {
    try {
      const response = await serverApi.get(SERVER_API_URLS.GROUP_COURSES_PATH, {
        headers: _getAuthHeader(),
      });
      return response.data.result || [];
    } catch (e) {
      _getErrorAlertState(e);
      return [];
    }
  }

  async function getProfileInfo() {
    try {
      const response = await serverApi.get(SERVER_API_URLS.PROFILE_PATH, {
        headers: _getAuthHeader(),
      });

      return { data: response.data };
    } catch (e) {
      return {
        ..._getErrorAlertState(e),
        data: {},
      };
    }
  }

  async function updateProfileInfo({
    studentNumber,
    email,
    entranceYear,
    schoolId,
    takeCoursesTime,
  }) {
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
      return {
        ..._getErrorAlertState(e),
        data: {},
      };
    }
  }

  async function getPlans() {
    try {
      const response = await serverApi.get(SERVER_API_URLS.PLANS_PATH + "/", {
        headers: _getAuthHeader(),
      });
      return { data: response.data.result || [] };
    } catch (e) {
      return { ..._getErrorAlertState(e), data: [] };
    }
  }

  async function addCourseGroupToPlan({ planId, courseGroupId }) {
    try {
      const response = await serverApi.post(
        `${SERVER_API_URLS.PLANS_PATH}/${planId}/${courseGroupId}`,
        {},
        { headers: _getAuthHeader() }
      );
      return response.data;
    } catch (e) {
      _getErrorAlertState(e);

      return {};
    }
  }

  async function deleteCourseGroupFromPlan({ planId, courseGroupId }) {
    try {
      const response = await serverApi.delete(
        `${SERVER_API_URLS.PLANS_PATH}/${planId}/${courseGroupId}`,
        { headers: _getAuthHeader() }
      );

      return response.data;
    } catch (e) {
      _getErrorAlertState(e);

      return {};
    }
  }

  async function deletePlan({ planId }) {
    try {
      const response = await serverApi.delete(
        SERVER_API_URLS.PLANS_PATH + "/" + planId,
        { headers: _getAuthHeader() }
      );

      return response.data;
    } catch (e) {
      _getErrorAlertState(e);
    }
  }

  async function createPlan() {
    try {
      const response = await serverApi.post(
        SERVER_API_URLS.PLANS_PATH + "/",
        {},
        { headers: _getAuthHeader() }
      );
      return { data: response.data };
    } catch (e) {
      return {
        ..._getErrorAlertState(e),
        data: {},
      };
    }
  }
}

export default useUserActions;
