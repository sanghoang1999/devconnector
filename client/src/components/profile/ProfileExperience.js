import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const ProfileExperience = ({
  exp: { company, title, from, to, description }
}) => {
  return (
    <div>
      <h3>{company}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{from}</Moment> -
        {to ? <Moment format="DD/MM/YYYY">{to}</Moment> : "Now"}
      </p>
      <p>
        <strong>Position:</strong> {title}
      </p>
      {description && (
        <p>
          <strong>Description:</strong> {description}
        </p>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  exp: PropTypes.object.isRequired
};

export default ProfileExperience;
