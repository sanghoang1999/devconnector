import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    user: { name, avatar },
    company,
    status,
    location,
    website,
    social
  }
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img" src={avatar} alt="emvuidi" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company && <span>at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        {website && (
          <a
            href={
              website.indexOf("https://www.") === -1
                ? `  https://www.${website}`
                : website
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-globe fa-2x" aria-hidden="true" />
          </a>
        )}
        {social && social.twitter && (
          <a
            href={
              social.twitter.indexOf("https://www.") === -1
                ? `  https://www.${social.twitter}`
                : social.twitter
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter fa-2x" aria-hidden="true" />
          </a>
        )}
        {social && social.facebook && (
          <a
            href={
              social.facebook.indexOf("https://www.") === -1
                ? `  https://www.${social.facebook}`
                : social.facebook
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook fa-2x" aria-hidden="true" />
          </a>
        )}{" "}
        {social && social.youtube && (
          <a
            href={
              social.youtube.indexOf("https://www.") === -1
                ? `  https://www.${social.youtube}`
                : social.youtube
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube fa-2x" aria-hidden="true" />
          </a>
        )}{" "}
        {social && social.linkedin && (
          <a
            href={
              social.linkedin.indexOf("https://www.") === -1
                ? `  https://www.${social.linkedin}`
                : social.linkedin
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin fa-2x" aria-hidden="true" />
          </a>
        )}
        {social && social.instagram && (
          <a
            href={
              social.instagram.indexOf("https://www.") === -1
                ? `  https://www.${social.instagram}`
                : social.instagram
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram fa-2x" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
