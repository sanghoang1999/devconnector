import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/post";
import Moment from "react-moment";

const CommentItem = ({ postId, cmt, deleteComment, auth }) => {
  return (
    !auth.loading && (
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${cmt.user}`} key={cmt._id}>
            <img className="round-img" src={cmt.avatar} alt="" />
            <h4>{cmt.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{cmt.text}</p>
          <p className="post-date">
            <Moment fromNow>{cmt.date}</Moment>{" "}
          </p>
          {auth.user._id === cmt.user && (
            <button
              className="btn btn-danger"
              onClick={e => {
                deleteComment(postId, cmt._id);
              }}
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>
    )
  );
};

CommentItem.propTypes = {
  cmt: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
