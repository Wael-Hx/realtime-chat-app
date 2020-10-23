import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

const Register = ({ history }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [authState, loading, errors] = useSelector(({ auth }) => [
    auth.authState,
    auth.loading,
    auth.errors,
  ]);
  const [customError, setError] = useState("");

  let { code, message } = errors;
  const { email, username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const submitUser = (e) => {
    e.preventDefault();
    username ? setError("") : setError("a username is required");

    dispatch(registerUser(history, email, username, password));
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
          error={customError ? true : false}
          helperText={customError ? customError : false}
          value={username}
          name="username"
          onChange={onChange}
          label="Name"
          type="text"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          error={code.includes("email") ? true : false}
          helperText={code.includes("email") ? message : false}
          value={email}
          name="email"
          onChange={onChange}
          label="email"
          type="email"
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          value={password}
          error={code.includes("password") ? true : false}
          helperText={code.includes("password") ? message : false}
          name="password"
          onChange={onChange}
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          autoComplete="off"
          required
        />
        <div className="register-links">
          <Button
            type="submit"
            onSubmit={submitUser}
            variant="contained"
            className="signin-btn"
            color="primary"
          >
            Register
          </Button>
          Or
          <Link to="/auth" style={linkStyles}>
            <h3>Sign In</h3>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default withRouter(Register);
