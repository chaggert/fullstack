import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./app.css";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { initializeBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { logout, getLoggedInUser } from "./reducers/loginReducer";

const App = props => {
  useEffect(() => {
    props.initializeBlogs();
    props.getLoggedInUser();
  }, []);

  const blogFormRef = React.createRef();

  return (
    <div>
      <Notification />
      {props.user === null ? (
        <Login />
      ) : (
        <div>
          <p>
            {props.user.name} is logged in{" "}
            <button onClick={() => props.logout()}>logout</button>
          </p>
          <Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <Blogs user={props.user} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    blogs: state.blogs
  };
};

const mapDispatchToProps = {
  initializeBlogs,
  setNotification,
  logout,
  getLoggedInUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
