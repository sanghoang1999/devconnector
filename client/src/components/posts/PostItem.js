import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";

const PostItem = ({
  auth,
  post: { _id, name, avatar, text, user, likes, comments, date }
}) => {
  return (
    <div className="post bg-white my-1 p-1">
      <div>
        <Link to={`profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          {" "}
          Posted on <Moment format="YYYY/MM/DD"> {date} </Moment>{" "}
        </p>
        <button className="btn">
          <i className="fas fa-thumbs-up" /> <span>{likes.length}</span>
        </button>
        <button className="btn">
          <i className="fas fa-thumbs-down" />
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion {comments.length > 0 && <span> {comments.length} </span>}
        </Link>
        {auth.user._id === user && (
          <button className="btn btn-danger">
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PostItem);
