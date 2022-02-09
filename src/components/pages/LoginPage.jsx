import { Card, Grid } from "@mui/material";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import classes from "./LoginPage.module.css";
function LoginPage() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Card className={classes.card}>
          <Grid container >
            <Grid item xs={6}>
              <RegisterForm />
            </Grid>
            <Grid item xs={6}>
              <LoginForm />
            </Grid>
          </Grid>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
