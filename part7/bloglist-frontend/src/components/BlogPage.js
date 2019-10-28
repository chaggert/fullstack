import React from "react";
import { connect } from "react-redux";
import BlogForm from "./BlogForm";
import Blogs from "./Blogs";
import Togglable from "./Togglable";

const BlogPage = props => {
  const blogFormRef = React.createRef();
  return (
    <div>
      <Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <Blogs loggedInUser={props.loggedInUser} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
  };
};

export default connect(mapStateToProps)(BlogPage);
