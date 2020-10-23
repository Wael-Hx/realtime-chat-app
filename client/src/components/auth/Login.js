import React, { useState } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import Loading from "../nav/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
const linkStyles = {
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
};
const Login = ({ history }) => {
  const classes = useStyles();
  const [authState, loading, errors] = useSelector(({ auth }) => [
    auth.authState,
    auth.loading,
    auth.errors,
  ]);
  const dispatch = useDispatch();
  let { code, message } = errors;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitUser = (e) => {
    e.preventDefault();
    dispatch(login(history, email, password));
  };
  if (loading) {
    return <Loading />;
  } else if (authState) {
    return <Redirect to="/" />;
  }

  return (
    <section className="signin">
      <form
        onSubmit={submitUser}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          error={code.includes("email") ? true : false}
          helperText={code.includes("email") ? message : false}
          onChange={onChange}
          name="email"
          value={email}
          label="email"
          type="email"
          variant="outlined"
          fullWidth
          autoComplete="off"
        />
        <TextField
          error={code.includes("password") ? true : false}
          helperText={code.includes("password") ? message : false}
          value={password}
          name="password"
          onChange={onChange}
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          autoComplete="off"
        />
        <div className="register-links">
          <Button
            type="submit"
            onSubmit={submitUser}
            variant="contained"
            className="signin-btn"
            color="primary"
          >
            Sign in
          </Button>
          Or
          <Link to="/register" style={linkStyles}>
            <h3>create an account</h3>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default withRouter(Login);
