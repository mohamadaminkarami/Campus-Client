import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";
import useUserActions from "../actions/useUserActions";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import StudentNumberField from "../components/StudentNumberField";

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
    .email("فرمت ایمیلت درست نیست دوست عزیز :(")
    .required("ایمیلت رو نیاز داریم آخه :)"),
  studentNumber: Yup.string()
    .matches("^[0-9]*$", "شماره دانشجویی مگه فقط عدد نیست ؟؟؟؟")
    .min(8, "روت می‌شه با این شماره دانشجویی کوچولو بیای تو؟؟؟")
    .max(
      9,
      "به به چه شماره دانشجویی بلندی ولی حیف که فقط تا ۹ رقم می‌تانیم هندل کنیم :)"
    )
    .required("بدون شماره دانشجویی نمیشه که :(("),
  password: Yup.string().required("بدون رمز عبور نمیشه که :(("),
});

function LoginForm() {
  const classes = useStyles();
  const userActions = useUserActions();
  const handleSubmit = useCallback(
    async ({ email, password, studentNumber }) => {
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
