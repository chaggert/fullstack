import React from "react";

const BlogForm = ({
  title,
  titleChangeHandler,
  author,
  authorChangeHandler,
  url,
  urlChangeHandler,
  blogCreateHandler
}) => {
  return (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={blogCreateHandler}>
        <p>
          title: <input value={title} onChange={titleChangeHandler} />
        </p>
        <p>
          author: <input value={author} onChange={authorChangeHandler} />
        </p>
        <p>
          url: <input value={url} onChange={urlChangeHandler} />
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
