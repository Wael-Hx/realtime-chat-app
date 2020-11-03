import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { currentChat } from "../../actions/chat";

const Contact = ({ contactName, contactAvatar, codeName, contactCode }) => {
  const msgNotifier = useSelector(({ chat }) => chat.msgNotifier);
  const dispatch = useDispatch();

  const notifyCount = (notifications, string) => {
    return notifications.filter((el) => el === string).length || 0;
  };

  const openChat = () => {
    dispatch(currentChat(contactCode));
  };

  const linkStyles = {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  };
  return (
    <Link
      onClick={openChat}
      style={linkStyles}
      to={{
        pathname: `/${codeName}-${contactCode}`,
        state: { sender: codeName, recepient: contactCode },
      }}
    >
      <div className="contact">
        <Avatar alt={contactName} src={contactAvatar ?? "broken"} />

        <h4>
          {contactName}
          {notifyCount(msgNotifier, contactCode) > 0 ? (
            <span className="notify">
              {` ${notifyCount(msgNotifier, contactCode)} new message(s)`}
            </span>
          ) : null}
        </h4>
      </div>
    </Link>
  );
};

Contact.propTypes = {
  contactName: PropTypes.string.isRequired,
  contactAvatar: PropTypes.string,
  codeName: PropTypes.string.isRequired,
  contactCode: PropTypes.string.isRequired,
};

export default Contact;
