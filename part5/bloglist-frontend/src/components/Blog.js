import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
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
            {blog.likes} likes <button>like!</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
