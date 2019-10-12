import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, notification, setNotification, blogs, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const likeClickHandler = async event => {
    event.preventDefault();
    try {
      const newBlogObject = {
        ...blog,
        likes: blog.likes + 1
      };
      const returnedObject = await blogService.update(blog.id, newBlogObject);
      setNotification({
        message: `Liked!`,
        type: "success"
      });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 2000);
      setBlogs(
        blogs.map(b => (b.id !== returnedObject.id ? b : returnedObject))
      );
    } catch (exception) {
      setNotification({
        message: `Error: ${exception.message}`,
        type: "error"
      });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 2000);
    }
  };
  return (
    <div style={blogStyle}>
      <div onClick={() => setShowDetails(!showDetails)}>
        {blog.title} {blog.author}
      </div>
      {showDetails ? (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <p>
            {blog.likes} likes <button onClick={likeClickHandler}>like!</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
