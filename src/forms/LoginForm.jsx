import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";

import useUserActions from "../actions/useUserActions";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import StudentNumberField from "../components/StudentNumberField";
import config from "../config";

const { ROUTE_PATHS } = config;

const initialValues = {
  email: "",
  studentNumber: "",
  password: "",
};

const useStyles = makeStyles((theme) => ({
  loginForm: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    padding: "10px 10px 10px 10px",
    border: "1px solid white",
    height: "550px",
  },

  formField: {
    margin: "10px 10px 10px 10px",
  },

  formSubmitButton: {
    width: "50%",
    marginTop: 16,
    padding: "16px 0",
  },
}));

const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("لطفا فرمت ایمیل را به طور صحیح وارد کنید.")
    .required("ایمیل نمی‌تواند خالی باشد."),
  studentNumber: Yup.string()
    .matches("^[0-9]*$", "شماره دانش‌جویی تنها شامل عدد است.")
    .required("شماره دانش‌جویی نمی‌تواند خالی باشد."),
  password: Yup.string().required("رمز عبور نمی‌تواند خالی باشد."),
});

function LoginForm() {
  const classes = useStyles();
  const userActions = useUserActions();
  const handleSubmit = useCallback(
    async ({ email, password, studentNumber }) => {
      console.log({ loginFormData: { email, password, studentNumber } });
      await userActions.login({ email, password, studentNumber });
    },
    [userActions]
  );
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginFormSchema}
      onSubmit={async (values) => handleSubmit(values)}
    >
      <Form className={classes.loginForm} autoComplete="off">
        <EmailField
          name="email"
          sx={{ margin: "20px" }}
          label="ایمیل خود را وارد کنید."
          id="loginEmail"
        />
        <StudentNumberField
          name="studentNumber"
          sx={{ marginTop: "35px" }}
          id="loginStudentNumber"
          label="شماره‌ دانش‌جویی خود را وارد کنید."
        />

        <PasswordField
          name="password"
          sx={{ marginTop: "50px" }}
          id="loginPassword"
          label="رمز عبور خود را وارد کنید."
        />
        <Button
          variant="outlined"
          type="submit"
          color="success"
          sx={{ marginTop: "30px", border: 2 }}
        >
          وارد شوید
        </Button>
      </Form>
    </Formik>
  );
}

export default LoginForm;
