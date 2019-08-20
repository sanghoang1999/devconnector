import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import SubmitButton from "../layout/SubmitButton";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [submited, setSubmited] = useState(false);
  if (localStorage.getItem("token")) {
    return <Redirect to="/dashboard" />;
  }
  console.log("emvuidi");
  const { email, password } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async e => {
    e.preventDefault();
    setSubmited(true);
    login({ email, password }).then(data => {
      if (!data) {
        setSubmited(false);
      }
    });
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fa fa-user" aria-hidden="true" />
        Login
      </p>
      <form
        action="dashboard.html"
        className="form"
        onSubmit={e => onSubmit(e)}
      >
        <div className="form-group" />
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            placeholder="Email Address"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            placeholder="Name"
          />
        </div>
        <SubmitButton submited={submited} />
      </form>
      <p className="my-1">
        Don't have an account?
        <Link to="/register" disabled={submited ? "disabled" : ""}>
          {" "}
          Sign up
        </Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
