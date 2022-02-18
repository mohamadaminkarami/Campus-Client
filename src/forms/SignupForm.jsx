import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import CustomDatePicker from "../components/CustomDatePicker";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import SchoolBoxField from "../components/SchoolBoxField";
import StudentNumberField from "../components/StudentNumberField";
import useUserActions from "../actions/useUserActions";
import config from "../config";
import { makeStyles } from "@mui/styles";

const { ROUTE_PATHS } = config;

const initialValues = {
  school: "",
  entranceYear: "",
  email: "",
  studentNumber: "",
  password: "",
};

const useStyles = makeStyles((theme) => ({
  signupForm: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    padding: "10px 10px 10px 10px",
    border: "1px solid white",
    height: "550px",
  },
}));

const signupFormSchema = Yup.object().shape({
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
    .min(8, "حداقل طول شماره دانش‌جویی ۸ رقم است.")
    .max(9, "حداکثر طول شماره دانش‌جویی ۹ رقم است")
    .required("شماره دانش‌جویی نمی‌تواند خالی باشد."),
  password: Yup.string().required("رمز عبور نمی‌تواند خالی باشد."),
});

function SignupForm() {
  const classes = useStyles();
  const userActions = useUserActions();
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async ({ school, entranceYear, email, studentNumber, password }) => {
      console.log({
        signupFormData: {
          school,
          entranceYear,
          email,
          studentNumber,
          password,
        },
      });
      await userActions.signup({
        email,
        studentNumber,
        password,
        schoolId: school.id,
        entranceYear: entranceYear.getFullYear(),
      });
      navigate(ROUTE_PATHS.HOME, { replace: true });
    },
    [userActions, navigate]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={classes.signupForm}>
        <SchoolBoxField
          style={{ margin: "5px 5px 5px 5px" }}
          id="signupSchoolBox"
          name="school"
          label="دانشکده خود را انتخاب کنید."
        />
        <CustomDatePicker
          id="date"
          name="entranceYear"
          notSetDefaultValue={false}
          style={{ margin: "5px 5px 5px 5px" }}
          label="سال ورود خود به دانشگاه را وارد کنید."
          views={["year"]}
          disableFuture
        />
        <EmailField
          name="email"
          style={{ margin: "5px 5px 5px 5px" }}
          label="ایمیل خود را وارد کنید."
          id="signupEmail"
        />
        <StudentNumberField
          name="studentNumber"
          style={{ margin: "5px 5px 5px 5px" }}
          id="signupStudentNumber"
          label="شماره‌ دانش‌جویی خود را وارد کنید."
        />
        <PasswordField
          name="password"
          style={{ margin: "5px 5px 5px 5px" }}
          id="signupPassword"
          label="رمز عبور خود را وارد کنید."
        />
        <Button
          sx={{ marginTop: "10px" }}
          type="submit"
          color="primary"
          variant="outlined"
        >
          ثبت‌نام کنید.
        </Button>
      </Form>
    </Formik>
  );
}

export default SignupForm;
