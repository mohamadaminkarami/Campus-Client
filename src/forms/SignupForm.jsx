import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import * as Yup from "yup";
import useUserActions from "../actions/useUserActions";
import CustomDatePicker from "../components/CustomDatePicker";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import SchoolBoxField from "../components/SchoolBoxField";
import StudentNumberField from "../components/StudentNumberField";
import config from "../config";
import loginPageAlertState from "../states/loginPageAlertState";

const { ROUTE_PATHS } = config;

const initialValues = {
  school: "",
  entranceYear: "",
  email: "",
  studentNumber: "",
  password: "",
};

const useStyles = makeStyles(() => ({
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
  school: Yup.object().typeError("نمیخوای بگی؟؟؟").required("نمیخوای بگی؟؟؟"),
  entranceYear: Yup.date()
    .typeError("لطفا عدد :(((")
    .required("یه سال ورود به کمپس نرسه؟؟"),
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

function SignupForm() {
  const classes = useStyles();
  const userActions = useUserActions();
  const setLoginPageAlertState = useSetRecoilState(loginPageAlertState);
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async ({ school, entranceYear, email, studentNumber, password }) => {
      const response = await userActions.signup({
        email,
        studentNumber,
        password,
        schoolId: school.id,
        entranceYear: entranceYear.getFullYear(),
      });

      if (response.error) {
        setLoginPageAlertState(response.alertState);
      } else {
        navigate(ROUTE_PATHS.HOME, { replace: true });
      }
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
