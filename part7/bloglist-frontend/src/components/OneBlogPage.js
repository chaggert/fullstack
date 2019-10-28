import React from "react";
import { connect } from "react-redux";
import { voteFor, removeBlog } from "../reducers/blogReducer";
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
  setNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OneBlogPage);
