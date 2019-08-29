import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
import PropTypes from "prop-types";

const CommentForm = ({ addComment, post_id }) => {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Leave a Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addComment({ text }, post_id);
          setText("");
        }}
      >
        <textarea
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input type="submit" value="Comment" className="btn btn-dark my-1" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
