import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";
const ProfileGithub = ({ repos, getGithubRepos, username }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);
  return repos == null ? (
    <Spinner width="50px" margin="auto" display="block" />
  ) : (
    <div className="profile-github">
      <h2 className="text-primary my-2">
        <i className="fab fa-github" aria-hidden="true" /> Github Repos
      </h2>
      {repos.map(repo => (
        <div key={repo.id} className="repo bg-white p-1 my-1">
          <div>
            <h4>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary">
                Stars: {repo.stargazers_count}
              </li>
              <li className="badge badge-primary">
                Watchers: {repo.watchers_count}
              </li>
              <li className="badge badge-primary">Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(
  mapStateToProps,
  { getGithubRepos }
)(ProfileGithub);
