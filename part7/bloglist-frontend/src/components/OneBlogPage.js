import React from "react";
import { connect } from "react-redux";
import { voteFor, removeBlog, submitComment } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const OneBlogPage = props => {
  if (props.blog === undefined) {
    return null;
  }

  const vote = async event => {
    props.voteFor(props.blog);
    props.setNotification(`Voted for ${props.blog.title}`, 3);
  };

  const remove = async event => {
    props.removeBlog(props.blog);
    props.setNotification(`${props.blog.title} has been removed`, 3);
  };

  const addComment = async event => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    props.submitComment(comment, props.blog);
    props.setNotification(`Your comment has been added`, 3);
  };

  return (
    <div>
      <h4>
        {props.blog.title}, written by: {props.blog.author}
      </h4>
      <a href={props.blog.url}>{props.blog.url}</a>
      <p>
        {props.blog.likes} likes <button onClick={() => vote()}>like!</button>
      </p>
      <p>{props.blog.user.name}</p>
      {props.blog.user.id === props.loggedInUser.id ? (
        <button onClick={() => remove()}>remove</button>
      ) : null}
      <h4>Leave a comment</h4>
      <form onSubmit={addComment}>
        <p>
          comment: <input name="comment" />
        </p>
        <button type="submit">submit</button>
      </form>
      <h4>Comments</h4>
      {props.blog.comments.map(c => (
        <p>{c.comment}</p>
      ))}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser,
    blog: state.blog
  };
};

const mapDispatchToProps = {
  voteFor,
  removeBlog,
  submitComment,
  setNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OneBlogPage);
