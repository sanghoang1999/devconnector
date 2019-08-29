import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.post_id);
  }, [getPost, match.params.post_id]);

  return loading || post === null ? (
    <Spinner width="50px" margin="auto" display="block" />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn btn-light">
        Back To Posts
      </Link>

      <PostItem post={post} showAction={false} />

      <CommentForm post_id={match.params.post_id} />
      <div className="posts">
        {post.comments.length > 0 &&
          post.comments.map(cmt => (
            <CommentItem postId={post._id} key={cmt._id} cmt={cmt} />
          ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
