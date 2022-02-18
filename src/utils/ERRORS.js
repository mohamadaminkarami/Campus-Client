const ERRORS = {
  // global
  TOKEN_ISSUE: "issue in token creation", // 500
  UNAUTH: "unauthorized", // 401
  // Schools (no errors)
  // Sign up
  // errors like "Key: 'SignupUserData.SchoolId' Error:Field validation for 'SchoolId' failed on the 'required' tag"
  // should be dealt with in front before request
  DUP_STID:
    'ERROR: duplicate key value violates unique constraint "users_student_number_key" (SQLSTATE 23505)', // 400
  // Login
  // errors like "Key: 'LoginUserData.StudentNumber' Error:Field validation for 'StudentNumber' failed on the 'required' tag"
  // should be dealt with in front before request
  NETWORK_ERROR: "Network Error", // ?
  TIME_LIMIT: "timeout of 2000ms exceeded", // ?
  WRONG_PASSWORD: "wrong password provided", // 401
  USER_NOT_EXISTS: "record not found", // 400
  // Profile
  HASH_ERROR: "error in hashing", // 500
  // errors like "Key: 'UpdateUserData.StudentNumber' Error:Field validation for 'StudentNumber' failed on the 'required' tag"
  // should be dealt with in front before request
  // schoolId should exists and timestamp should be after year 2010
  // can't set email, entrance year, takeCoursesTime to empty
  // currently can't change stid
  // Plan
  PLAN_NOT_FOUND: "Plan not found", // 404
  CG_NOT_FOUND: "courseGroup not found", //404
  // if 404 received use default message "شی مورد نظر پیدا نشد" in case Error message was not availabe
};

export default ERRORS;
