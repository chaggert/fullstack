import React from "react";
import "./BlogForm.css";
import { connect } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = props => {
  const addBlog = async event => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
    props.createBlog(title, author, url, props.loggedInUser);
    props.setNotification(`${title} was created`, 3);
  };
  return (
    <div className="formBorder">
      <h3>Create a new blog</h3>
      <form onSubmit={addBlog}>
        <p>
          title: <input name="title" />
        </p>
        <p>
          author: <input name="author" />
        </p>
        <p>
          url: <input name="url" />
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
  };
};

export default connect(
  mapStateToProps,
  { createBlog, setNotification }
)(BlogForm);
