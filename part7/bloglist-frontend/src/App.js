import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./app.css";
import blogService from "./services/blogs";
// import loginService from "./services/login";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
// import { useField } from "./hooks/index";
import { initializeBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { logout } from "./reducers/loginReducer";

const App = props => {
  // const username = useField("text");
  // const password = useField("password");
  const [user, setUser] = useState(null);
  const blogFormRef = React.createRef();

  useEffect(() => {
    props.initializeBlogs();
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // const handleLogin = async event => {
  //   event.preventDefault();
  //   try {
  //     const user = await loginService.login({
  //       username: username.value,
  //       password: password.value
  //     });
  //     window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  //     blogService.setToken(user.token);
  //     setUser(user);
  //     username.reset();
  //     password.reset();
  //   } catch (exception) {
  //     props.setNotification(`${exception.message}`, 3);
  //   }
  // };

  // const handleLogout = async event => {
  //   event.preventDefault();
  //   try {
  //     window.localStorage.removeItem("loggedBlogappUser");
  //     setUser(null);
  //   } catch (exception) {
  //     return exception;
  //   }
  // };

  // const handleBlogCreate = async event => {
  //   event.preventDefault();
  //   try {
  //     blogFormRef.current.toggleVisibility();
  //     const createdBlog = await blogService.create({
  //       title: newBlogTitle.value,
  //       author: newBlogAuthor.value,
  //       url: newBlogUrl.value
  //     });
  //     setBlogs(blogs.concat(createdBlog));
  //     newBlogTitle.reset();
  //     newBlogAuthor.reset();
  //     newBlogUrl.reset();
  //     setNotification({
  //       message: `New blog ${createdBlog.title} successfully created!`,
  //       type: "success"
  //     });
  //     setTimeout(() => {
  //       setNotification({ message: null, type: null });
  //     }, 2000);
  //   } catch (exception) {
  //     setNotification({
  //       message: `Could not create blog: ${exception.message}`,
  //       type: "error"
  //     });
  //     setTimeout(() => {
  //       setNotification({ message: null, type: null });
  //     }, 2000);
  //   }
  // };

  return (
    <div>
      <Notification />
      {user === null ? (
        <Login />
      ) : (
        <div>
          <p>
            {user.name} is logged in{" "}
            <button onClick={props.logout()}>logout</button>
          </p>
          <Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <Blogs user={user} />
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  initializeBlogs,
  setNotification,
  logout
};

export default connect(
  null,
  mapDispatchToProps
)(App);
