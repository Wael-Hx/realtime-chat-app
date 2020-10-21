import React from "react";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./home.css";
import { useSelector } from "react-redux";
import Loading from "../nav/Loading";
import Contact from "./Contact";
import AddContact from "./AddContact";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "70%",
    margin: "auto",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  searchContainer: {
    display: "flex",
    width: "100%",
    bottom: "1%",
  },
  containerStyle: {
    position: "relative",
    height: "100%",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [loading, user, authState] = useSelector(({ auth }) => [
    auth.loading,
    auth.user,
    auth.authState,
  ]);

  if (loading) {
    return <Loading />;
  }
  if (!authState) {
    return <Redirect to="/auth" />;
  }

  return (
    <Container className={classes.containerStyle} maxWidth="sm">
      <main className="chat-container">
        <section>
          {user?.userProfile?.contacts.map((contact) => {
            return (
              <Contact
                key={contact._id}
                contactName={contact.username}
                contactAvatar={contact.avatar}
                codeName={user?.userProfile.codeName}
                contactCode={contact.codeName}
              />
            );
          })}
        </section>
        <div className={classes.searchContainer}>
          <AddContact codeName={user?.userProfile.codeName} />
        </div>
      </main>
    </Container>
  );
};

export default Home;
