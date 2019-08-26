import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const ProfileEducation = ({
  edu: { school, degree, fieldofstudy, from, to, description }
}) => {
  return (
    <div>
      <h3>{school}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{from}</Moment> -
        {to ? <Moment format="DD/MM/YYYY">{to}</Moment> : "Now"}
      </p>
      <p>
        <strong>Degree:</strong> {degree}
      </p>
      <p>
        <strong>Field Of Study:</strong> {fieldofstudy}
      </p>
      {description && (
        <p>
          <strong>Description:</strong> {description}
        </p>
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  edu: PropTypes.object.isRequired
};

export default ProfileEducation;
