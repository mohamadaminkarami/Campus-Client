import { Button, Grid, Grow } from "@mui/material";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useCallback } from "react";
import clsx from "clsx";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import { useRecoilValue } from "recoil";
import userAuthState from "../states/userAuthState";
import { useNavigate } from "react-router-dom";
import config from "../config";
const { ROUTE_PATHS } = config;
const useStyles = makeStyles((theme) => ({
  root: {
    left: "50%",
    top: "50%",
    position: "absolute",
    transform: "translate(-50%, -60%)",
    alignItems: "center",
    width: "70%",
  },

  box: {
    maxHeight: "100%",
    boxShadow: "10px 10px 8px rgba(0, 0, 0, 1)",
    background: "linear-gradient(to right, #0c021bc4, #010a03c0)",
  },

  loginFormContaniner: {
    padding: "10px 10px 10px 5px",
  },
  registerFormContaniner: {
    padding: "10px 5px 10px 10px",
  },

  "@keyframes change": {
    "0%": {
      left: "0px",
    },
    "100%": {
      right: "0px",
    },
  },

  "@keyframes loginEffect": {
    "0%": {
      left: "0px",
    },
    "100%": {
      right: "0px",
    },
  },

  registerAnimation: {
    animationDirection: "normal",
  },
  loginAnimation: {
    animationDirection: "reverse",
  },

  detailCardContainer: {
    padding: "10px 5px 10px 10px",
    animation: "change 5s 1",
    position: "relative",
  },

  detailCard: {
    textAlign: "center",
    width: "100%",
    padding: "10px 10px 10px 10px",
    border: "1px solid white",
    height: "550px",
  },
}));

function LoginPage() {
  const auth = useRecoilValue(userAuthState);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      navigate(ROUTE_PATHS.HOME, { replace: true });
    }
  }, [auth, navigate]);
  const [hasAccount, setHasAccount] = useState(true);

  const handleButtonClick = useCallback(() => {
    setHasAccount((hasAccount) => !hasAccount);
  }, [hasAccount, setHasAccount]);

  const classes = useStyles();

  const getAnimationClass = useCallback(() => {
    if (hasAccount === undefined) {
      return undefined;
    }
    return hasAccount === true
      ? classes.registerAnimation
      : classes.loginAnimation;
  }, [hasAccount, classes]);

  return (
    <div className={classes.root}>
      ثبت‌نام و ورود
      <br />
      <hr />
      <Box className={classes.box}>
        <Grid container>
          <Grow
            in={hasAccount}
            style={{
              transformOrigin: "0 0 0",
              display: !hasAccount ? "none" : "",
            }}
            {...(hasAccount ? { timeout: 1000 } : {})}
          >
            <Grid
              item
              xs={6}
              className={classes.loginFormContaniner}
              id="loginFormContainer"
            >
              <LoginForm />
            </Grid>
          </Grow>

          <Grow
            in={!hasAccount}
            style={{
              transformOrigin: "0 0 0",
              display: hasAccount ? "none" : "",
            }}
            {...(!hasAccount ? { timeout: 1000 } : {})}
          >
            <Grid
              item
              xs={6}
              className={classes.registerFormContaniner}
              id="registerFormContainer"
            >
              <RegisterForm />
            </Grid>
          </Grow>

          <Grid
            item
            xs={6}
            className={clsx([classes.detailCardContainer, getAnimationClass()])}
            id="detailCardContainer"
          >
            <Box className={classes.detailCard}>
              <br />
              <br />
              <h1 id="header">به Campus خوش‌ اومدی :)</h1>
              <h4>ما اینجا کمکت می‌کنیم راحت‌تر انتخاب واحد کنی.</h4>
              <br />
              <br />
              <div id="detailBody">
                {hasAccount ? (
                  <div>اگر حساب کاربری ندارید لطفا :</div>
                ) : (
                  <div>حساب کاربری دارید؟ لطفا:</div>
                )}
              </div>
              <br />
              <br />

              <Button
                sx={{ marginTop: "10px" }}
                onClick={handleButtonClick}
                color={hasAccount ? "primary" : "success"}
                variant="outlined"
                id="detailBody"
              >
                {hasAccount ? <div>ثبت‌نام کنید.</div> : <div>وارد شوید.</div>}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default LoginPage;
