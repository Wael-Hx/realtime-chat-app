import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logout } from "../../actions/auth";
import { connectSocket, disconnect, socketReceive } from "../../actions/chat";
import Loading from "./Loading";
import "./navbar.css";
import UserOptions from "./UserOptions";
import Notifications from "./Notifications";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const Navbar = ({ history }) => {
  const linkStyles = {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    padding: 0,
    margin: 0,
  };
  const classes = useStyles();
  const [
    userData,
    loading,
    authState,
    codeName,
    friendRequests,
    notificationsCount,
  ] = useSelector(({ auth }) => [
    auth.user,
    auth.loading,
    auth.authState,
    auth.userCode,
    auth.friendRequests,
    auth.notificationsCount,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
    console.log("this a test build");
  }, [dispatch]);

  useEffect(() => {
    dispatch(connectSocket(codeName));
  }, [codeName, dispatch]);

  useEffect(() => {
    dispatch(socketReceive());
  }, []);

  const handleLogout = () => {
    dispatch(disconnect());
    dispatch(logout(history));
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <nav>
      <Link style={linkStyles} to="/">
        <h2 className="home">Chat </h2>
      </Link>
      <div className="account">
        {authState ? (
          <>
            <Avatar
              alt={userData?.username}
              src={userData?.avatar ?? "broken"}
              className={classes.small}
            />
            <UserOptions handleLogout={handleLogout} />
            <Notifications
              nCount={notificationsCount}
              fRequests={friendRequests}
              codeName={codeName}
            />
          </>
        ) : (
          <Link to="/auth" style={linkStyles}>
            <h2 className="sign-in">Sign in</h2>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
