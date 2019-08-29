import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
const PostItem = ({
  auth,
  addLike,
  removeLike,
  index,
  deletePost,
  showAction = true,
  post: { _id, name, avatar, text, user, likes, comments, date }
}) => {
  return (
    !auth.loading && (
      <div className="post bg-white my-1 p-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>

        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            {" "}
            Posted on <Moment fromNow>{date}</Moment>{" "}
          </p>
          {showAction && (
            <Fragment>
              <button className="btn" onClick={() => addLike(_id)}>
                <i className="fas fa-thumbs-up" /> <span>{likes.length}</span>
              </button>
              <button className="btn" onClick={() => removeLike(_id)}>
                <i className="fas fa-thumbs-down" />
              </button>
              <Link to={`/posts/${_id}`} className="btn btn-primary">
                Discussion{" "}
                {comments.length > 0 && <span> {comments.length} </span>}
              </Link>
              {auth.user._id === user && (
                <button
                  className="btn btn-danger"
                  onClick={e => {
                    deletePost(_id, index);
                  }}
                >
                  <i className="fas fa-times" />
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    )
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
