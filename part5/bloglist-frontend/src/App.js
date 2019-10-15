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
  const newBlogTitle = useField("text");
  const newBlogAuthor = useField("text");
  const newBlogUrl = useField("text");
  const [user, setUser] = useState(null);
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
      username.reset();
      password.reset();
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
      const createdBlog = await blogService.create({
        title: newBlogTitle.value,
        author: newBlogAuthor.value,
        url: newBlogUrl.value
      });
      setBlogs(blogs.concat(createdBlog));
      newBlogTitle.reset();
      newBlogAuthor.reset();
      newBlogUrl.reset();
      setNotification({
        message: `New blog ${createdBlog.title} successfully created!`,
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
              newBlogTitle={newBlogTitle}
              newBlogAuthor={newBlogAuthor}
              newBlogUrl={newBlogUrl}
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
