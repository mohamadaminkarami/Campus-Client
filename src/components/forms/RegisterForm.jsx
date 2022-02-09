import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomDatePicker from "../CustomDatePicker";
import EmailField from "../EmailField";
import PasswordField from "../PasswordField";
import SchoolBoxField from "../SchoolBoxField";
import StudentNumberField from "../StudentNumberField";
import useUserActions from "../../actions/useUserActions";
import classes from "./RegisterForm.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import config from "../../config";
const { ROUTE_PATHS } = config;
const initialValues = {
  school: "",
  entranceYear: "",
  email: "",
  studentNumber: "",
  password: "",
};

const registerFormSchema = Yup.object().shape({
  school: Yup.object()
    .shape({ name: Yup.string().required(), id: Yup.number().required() })
    .required("دانشکده نمی‌تواند خالی باشد."),
  entranceYear: Yup.string().required("سال ورودی نمی‌تواند خالی باشد."),
  email: Yup.string()
    .email("لطفا فرمت ایمیل را به طور صحیح وارد کنید.")
    .required("ایمیل نمی‌تواند خالی باشد."),
  studentNumber: Yup.string().required("شماره دانش‌جویی نمی‌تواند خالی باشد."),
  password: Yup.string().required("رمز عبور نمی‌تواند خالی باشد."),
});

function RegisterForm() {
  const userActions = useUserActions();
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (values) => {
      console.log(values);
      await userActions.register(values);
      navigate(ROUTE_PATHS.HOME, { replace: true });
    },
    [userActions, navigate]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerFormSchema}
      onSubmit={async (values) => await handleSubmit(values)}
    >
      <Form className={classes.registerForm}>
        <SchoolBoxField
          className={classes.field}
          id="registerSchoolBox"
          name="school"
          label="دانشکده خود را انتخاب کنید."
        />
        <CustomDatePicker
          id="date"
          name="entranceYear"
          className={classes.field}
          label="سال ورود خود به دانشگاه را وارد کنید."
          views={["year"]}
          disableFuture={true}
        />
        <EmailField
          name="email"
          className={classes.field}
          label="ایمیل خود را وارد کنید."
          id="registerEmail"
        />
        <StudentNumberField
          name="studentNumber"
          className={classes.field}
          id="registerStudentNumber"
          label="شماره‌ دانش‌جویی خود را وارد کنید."
        />
        <PasswordField
          name="password"
          className={classes.field}
          id="registerPassword"
          label="رمز عبور خود را وارد کنید."
        />
        <Button
          className={classes.submitButton}
          type="submit"
          color="secondary"
          variant="contained"
        >
          ثبت‌نام کنید.
        </Button>
      </Form>
    </Formik>
  );
}

export default RegisterForm;
