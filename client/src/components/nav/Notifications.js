import React, { useRef, useState, useEffect } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import { useDispatch } from "react-redux";
import { currentChat } from "../../actions/chat";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(1),
  },
}));

const Notifications = ({ nCount, fRequests, codeName }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const linkStyles = {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    padding: 0,
    margin: 0,
  };
  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevState = useRef(open);
  useEffect(() => {
    if (prevState.current && !open) {
      anchorRef.current.focus();
    }
    prevState.current = open;
  }, [open]);

  const openChat = (newContact) => {
    dispatch(currentChat(newContact));
  };
  return (
    <div className={classes.root}>
      <div>
        <IconButton
          style={{ padding: "3px 7px" }}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Badge badgeContent={nCount} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {fRequests.map((newContact, idx) => (
                      <MenuItem key={idx} onClick={handleClose}>
                        <Link
                          onClick={() => openChat(newContact)}
                          style={linkStyles}
                          to={{
                            pathname: `/${codeName}-${newContact}`,
                            state: { sender: codeName, recepient: newContact },
                          }}
                        >
                          {newContact + " wants to chat with you"}
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

Notifications.propTypes = {
  nCount: PropTypes.number.isRequired,
  fRequests: PropTypes.array.isRequired,
  codeName: PropTypes.string.isRequired,
};
export default Notifications;
