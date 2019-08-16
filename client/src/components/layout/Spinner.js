import React, { Fragment } from "react";
import PropTypes from "prop-types";
import spinner from "./spinner.gif";
const Spinner = props => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: "50px", margin: "auto", display: "block" }}
        alt="loading..."
      />
    </Fragment>
  );
};

export default Spinner;
