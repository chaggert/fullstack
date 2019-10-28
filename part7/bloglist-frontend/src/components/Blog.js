import React, { useState } from "react";
import { connect } from "react-redux";
import { voteFor, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = props => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const vote = async event => {
    props.voteFor(props.blog);
    props.setNotification(`Voted for ${props.blog.title}`, 3);
  };

  const remove = async event => {
    props.removeBlog(props.blog);
    props.setNotification(`${props.blog.title} has been removed`, 3);
  };

  return (
    <div style={blogStyle} className="blogParent">
      <div
        onClick={() => setShowDetails(!showDetails)}
        className="detailToggler"
      >
        {props.blog.title} {props.blog.author}
      </div>
      {showDetails ? (
        <div className="blogDetails">
          <a href={props.blog.url}>{props.blog.url}</a>
          <p>
            {props.blog.likes} likes{" "}
            <button onClick={() => vote()}>like!</button>
          </p>
          <p>{props.blog.user.name}</p>
          {props.blog.user.id === props.loggedInUser.id ? (
            <button onClick={() => remove()}>remove</button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
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
)(Blog);
