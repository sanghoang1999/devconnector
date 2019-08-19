import React, { Fragment } from "react";
import PropTypes from "prop-types";
import spinner from "./spinner.gif";
const Spinner = ({ width, display, margin }) => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: width, margin: margin, display: display }}
        alt="loading..."
      />
    </Fragment>
  );
};

export default Spinner;
