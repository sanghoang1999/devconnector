import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
  profile: { profile, loading },
  getProfileById,
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.user_id);
  }, [getProfileById, match.params.user_id]);
  return loading || profile == null ? (
    <Spinner width="50px" margin="auto" display="block" />
  ) : (
    <Fragment>
      <Link to="/profiles" className="btn btn-light">
        Back to Profiles
      </Link>
      {auth.isAuthenticated &&
      auth.user._id === match.params.user_id &&
      !auth.loading ? (
        <Link to="/edit-profile" className="btn btn-dark">
          Edit Profile
        </Link>
      ) : (
        ""
      )}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile.experience.length > 0 ? (
            <Fragment>
              {profile.experience.map((exp, index) => (
                <ProfileExperience key={index} exp={exp} />
              ))}
            </Fragment>
          ) : (
            <h4>No experience credentials</h4>
          )}
        </div>
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education.length > 0 ? (
            <Fragment>
              {profile.education.map((edu, index) => (
                <ProfileEducation key={index} edu={edu} />
              ))}
            </Fragment>
          ) : (
            <h4>No education credentials</h4>
          )}
        </div>
        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileByid: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
