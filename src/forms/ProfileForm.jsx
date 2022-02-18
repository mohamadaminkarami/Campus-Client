import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import getTimeStampFromDate from "../utils/getTimestampFromDate";
import CustomDatePicker from "../components/CustomDatePicker";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import SchoolBoxField from "../components/SchoolBoxField";
import StudentNumberField from "../components/StudentNumberField";
import useUserActions from "../actions/useUserActions";
import config from "../config";
import { makeStyles } from "@mui/styles";
import { useRecoilState, useRecoilValue } from "recoil";
import userProfileState from "../states/userProfileState";
import { DateTimePicker } from "@mui/lab";
import CustomDateTimePicker from "../components/CustomDateTimePicker";
import schoolListState from "../states/schoolsListState";

const { ROUTE_PATHS } = config;

const useStyles = makeStyles((theme) => ({
  signupForm: {
    display: "flex",
    flexDirection: "column",
    width: "99%",
    alignItems: "center",
    padding: "10px 10px 10px 10px",
    border: "1px solid white",
    height: "600px",
    margin: "10px",
    boxShadow: "10px 10px 8px rgba(0, 0, 0, 1)",
    background: "linear-gradient(to right, #0c021bc4, #010a03c0)",
  },
}));

const profileFormSchema = Yup.object().shape({
  school: Yup.object()
    .typeError("دانشکده نمی‌تواند خالی باشد.")
    .required("دانشکده نمی‌تواند خالی باشد."),
  entranceYear: Yup.date()
    .typeError("سال ورودی تنها شامل عدداست.")
    .required("سال ورودی نمی‌تواند خالی باشد."),
  email: Yup.string()
    .email("لطفا فرمت ایمیل را به طور صحیح وارد کنید.")
    .required("ایمیل نمی‌تواند خالی باشد."),
  studentNumber: Yup.string()
    .matches("^[0-9]*$", "شماره دانش‌جویی تنها شامل عدد است.")
    .required("شماره دانش‌جویی نمی‌تواند خالی باشد."),
});

function ProfileForm() {
  const classes = useStyles();
  const userActions = useUserActions();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  const handleSubmit = useCallback(
    async ({ school, entranceYear, email, studentNumber, takeCoursesTime }) => {
      entranceYear = entranceYear.getFullYear();
      takeCoursesTime = parseInt(takeCoursesTime / 1000, 10);
      console.log({
        school,
        entranceYear,
        email,
        studentNumber,
        takeCoursesTime,
      });
      await userActions.updateProfileInfo({
        email,
        schoolId: school.id,
        takeCoursesTime,
        entranceYear,
        studentNumber,
      });
      navigate(ROUTE_PATHS.PROFILE, { replace: true });
    },
    [userActions, navigate]
  );

  return (
    <Formik
      initialValues={userProfile}
      validationSchema={profileFormSchema}
      onSubmit={async (values) => handleSubmit(values)}
    >
      <Form className={classes.signupForm}>
        <SchoolBoxField
          notSetDefaultValue
          style={{ margin: "25px 5px 5px 5px" }}
          id="profileSchoolBox"
          name="school"
          label="دانشکده خود را انتخاب کنید."
        />
        <CustomDatePicker
          notSetDefaultValue
          id="profileEntranceYear"
          name="entranceYear"
          style={{ margin: "25px 5px 5px 5px" }}
          label="سال ورود خود به دانشگاه را وارد کنید."
          views={["year"]}
          disableFuture
        />
        <EmailField
          name="email"
          style={{ margin: "25px 5px 5px 5px" }}
          label="ایمیل خود را وارد کنید."
          id="profileEmailEmail"
        />
        <StudentNumberField
          name="studentNumber"
          style={{ margin: "25px 5px 5px 5px" }}
          id="profileStudentNumber"
          label="شماره‌ دانش‌جویی خود را وارد کنید."
        />
        <CustomDateTimePicker
          id="takeCoursesTime"
          name="takeCoursesTime"
          style={{ margin: "25px 5px 5px 5px" }}
          label="زمان انتخاب واحد خود را انتخاب کنید"
        />

        <Button
          sx={{ marginTop: "30px" }}
          type="submit"
          color="primary"
          variant="outlined"
        >
          ثبت تغییرات
        </Button>
      </Form>
    </Formik>
  );
}

export default ProfileForm;
