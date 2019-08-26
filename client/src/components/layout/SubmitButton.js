import React from "react";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const SubmitButton = ({ submited, name }) => {
  return (
    <button
      className={`btn ${!submited ? " btn-primary" : ""}`}
      type="submit"
      disabled={submited ? "disabled" : ""}
    >
      {" " + name}
      {submited && (
        <Spinner
          width={"20px"}
          display={"inline-block"}
          margin={"0 0 -3px 0"}
        />
      )}
    </button>
  );
};

SubmitButton.propTypes = {
  submited: PropTypes.bool.isRequired
};

export default SubmitButton;
