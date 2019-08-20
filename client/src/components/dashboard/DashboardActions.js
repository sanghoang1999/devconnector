import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const DashboardActions = props => {
  return (
    <Fragment>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user text-primary" aria-hidden="true" />
          <span> Edit Profile</span>
        </Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="fab fa-black-tie text-primary" aria-hidden="true" />
          <span> Add Experience</span>
        </Link>
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-user text-primary " aria-hidden="true" />

          <span> Add Education</span>
        </Link>
      </div>
    </Fragment>
  );
};

export default DashboardActions;
