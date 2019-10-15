import React, { useState, useEffect } from "react";
import "./app.css";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blog from "./components/Blog";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useField } from "./hooks/index";

function App() {
  const [blogs, setBlogs] = useState([]);
  const username = useField("text");
  const password = useField("password");
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
  const blogFormRef = React.createRef();

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
        username: username.value,
        password: password.value
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
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

  const handleBlogCreate = async event => {
    event.preventDefault();
    try {
      blogFormRef.current.toggleVisibility();
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
      {notification.message !== null ? (
        <Notification message={notification.message} type={notification.type} />
      ) : null}
      {user === null ? (
        <Login
          username={username}
          password={password}
          loginHandler={handleLogin}
        />
      ) : (
        <div>
          <p>
            {user.name} is logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
            <BlogForm
              title={newBlog.title}
              titleChangeHandler={({ target }) =>
                setNewBlog({ ...newBlog, title: target.value })
              }
              author={newBlog.author}
              authorChangeHandler={({ target }) =>
                setNewBlog({ ...newBlog, author: target.value })
              }
              url={newBlog.url}
              urlChangeHandler={({ target }) =>
                setNewBlog({ ...newBlog, url: target.value })
              }
              blogCreateHandler={handleBlogCreate}
            />
          </Togglable>
          <h2>Blogs</h2>
          {blogs
            .sort(function(a, b) {
              return b.likes - a.likes;
            })
            .map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                setNotification={setNotification}
                blogs={blogs}
                setBlogs={setBlogs}
                userId={user.id}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
