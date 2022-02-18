import ERRORS from "./ERRORS";

const ERROR_MESSAGES = {
  [ERRORS.NETWORK_ERROR]: "ارتباط با سرور برقرار نشد.",
  [ERRORS.TIME_LIMIT]: "ارتباط با سرور برقرار نشد.",
  [ERRORS.USER_NOT_EXISTS]: "کاربری با اطلاعات داده شده وجود ندارد.",
  [ERRORS.WRONG_PASSWORD]:
    "رمز عبور وارد شده با شماره دانش‌جویی هم‌خوانی ندارد.",
  [ERRORS.DUP_STID]: "کاربری با این شماره دانشجویی قبلا ثبت‌نام کرده :(",
  [ERRORS.WRONG_PASSWORD]: "رمز عبورت اشتباهه که :((",
  [ERRORS.USER_NOT_EXISTS]: "اول ثبت‌نام کن بعد بخواه وارد شی :((",
};

export default ERROR_MESSAGES;
