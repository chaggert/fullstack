import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
import "./app.css";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blog from "./components/Blog";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: ""
  });
  const [notification, setNotification] = useState({
    message: null,
    type: null
  });

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      //blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification({
        message: `Could not login: ${exception.message}`,
        type: "error"
      });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 2000);
    }
  };

  const handleLogout = async event => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBlogappUser");
      setUser(null);
    } catch (exception) {
      return exception;
    }
  };

  const handleTitleChange = event => {
    setNewBlog({ ...newBlog, title: event.target.value });
  };

  const handleAuthorChange = event => {
    setNewBlog({ ...newBlog, author: event.target.value });
  };

  const handleUrlChange = event => {
    setNewBlog({ ...newBlog, url: event.target.value });
  };

  const handleBlogCreate = async event => {
    event.preventDefault();
    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setNewBlog({
        title: "",
        author: "",
        url: ""
      });
      setNotification({
        message: `New blog ${newBlog.title} successfully created!`,
        type: "success"
      });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 2000);
    } catch (exception) {
      setNotification({
        message: `Could not create blog: ${exception.message}`,
        type: "error"
      });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 2000);
    }
  };

  return (
    <div>
      {notification.message != null ? (
        <Notification message={notification.message} type={notification.type} />
      ) : null}
      {user === null ? (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          loginHandler={handleLogin}
        />
      ) : (
        <div>
          <p>
            {user.name} is logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm
            title={newBlog.title}
            titleChangeHandler={handleTitleChange}
            author={newBlog.author}
            authorChangeHandler={handleAuthorChange}
            url={newBlog.url}
            urlChangeHandler={handleUrlChange}
            blogCreateHandler={handleBlogCreate}
          />
          <h2>Blogs</h2>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
