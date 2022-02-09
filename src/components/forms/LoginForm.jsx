import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useUserActions from "../../actions/useUserActions";
import EmailField from "../EmailField";
import PasswordField from "../PasswordField";
import StudentNumberField from "../StudentNumberField";
import classes from "./LoginForm.module.css";
import config from "../../config";
const { ROUTE_PATHS } = config;
const initialValues = {
  email: "",
  studentNumber: "",
  password: "",
};

const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("لطفا فرمت ایمیل را به طور صحیح وارد کنید.")
    .required("ایمیل نمی‌تواند خالی باشد."),
  studentNumber: Yup.string().required("شماره دانش‌جویی نمی‌تواند خالی باشد."),
  password: Yup.string().required("رمز عبور نمی‌تواند خالی باشد."),
});

function LoginForm() {
  const userActions = useUserActions();
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (values) => {
      console.log(values);

      await userActions.login(values);
      navigate(ROUTE_PATHS.HOME, { replace: true });
    },
    [userActions, navigate]
  );
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginFormSchema}
      onSubmit={async (values) => await handleSubmit(values)}
    >
      <Form className={classes.loginForm}>
        <EmailField
          name="email"
          className={classes.field}
          label="ایمیل خود را وارد کنید."
          id="loginEmail"
        />
        <StudentNumberField
          name="studentNumber"
          className={classes.field}
          id="loginStudentNumber"
          label="شماره‌ دانش‌جویی خود را وارد کنید."
        />

        <PasswordField
          name="password"
          className={classes.field}
          id="loginPassword"
          label="رمز عبور خود را وارد کنید."
        />
        <Button
          variant="contained"
          type="submit"
          className={classes.submitButton}
        >
          وارد شوید
        </Button>
      </Form>
    </Formik>
  );
}

export default LoginForm;
