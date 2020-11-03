import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { socketMessage, exitChat } from "../../actions/chat";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginTop: "auto",
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
}));

const Chat = ({ location }) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const chatState = useSelector(({ chat }) => chat);
  const dispatch = useDispatch();
  let codeName = location.state.sender;
  let recepient = location.state.recepient;
  useEffect(() => {
    return () => {
      dispatch(exitChat());
    };
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let newMessage = { codeName, message };
    dispatch(socketMessage(recepient, newMessage));
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Container style={{ height: "100%" }} maxWidth="sm">
      <main className="chat-container">
        <section className="chat">
          {chatState.messages[recepient]?.map((msg, idx) => (
            <Chip
              key={idx}
              style={
                msg.codeName !== codeName
                  ? { alignSelf: "flex-end", flexDirection: "row-reverse" }
                  : { alignSelf: "flex-start" }
              }
              component="div"
              color={msg.codeName !== codeName ? "default" : "primary"}
              avatar={
                <Avatar
                  className={
                    msg.codeName !== codeName ? "recepient-avatar" : ""
                  }
                  alt={msg.codeName}
                  src=""
                />
              }
              label={msg.message}
              variant="outlined"
            />
          ))}
        </section>
        <Paper
          onSubmit={handleSubmit}
          component="form"
          className={classes.root}
        >
          <InputBase
            value={message}
            onChange={handleChange}
            className={classes.input}
            multiline
            placeholder="Type a message..."
            inputProps={{ "aria-label": "Type a message..." }}
          />
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            type="submit"
            color="primary"
            className={classes.iconButton}
            aria-label="directions"
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </main>
    </Container>
  );
};

export default Chat;
