import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Contact = ({ contactName, contactAvatar, codeName, contactCode }) => {
  return (
    <div className="contact">
      <Avatar
        component={Link}
        to={{
          pathname: `/${codeName}-${contactCode}`,
          state: { sender: codeName, recepient: contactCode },
        }}
        alt={contactName}
        src={contactAvatar ?? "broken"}
      />

      <h4>{contactName} </h4>
    </div>
  );
};

Contact.propTypes = {
  contactName: PropTypes.string.isRequired,
  contactAvatar: PropTypes.string,
  codeName: PropTypes.string.isRequired,
  contactCode: PropTypes.string.isRequired,
};

export default Contact;
