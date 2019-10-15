import React from "react";

const BlogForm = ({
  newBlogTitle,
  // titleChangeHandler,
  newBlogAuthor,
  // authorChangeHandler,
  newBlogUrl,
  // urlChangeHandler,
  blogCreateHandler
}) => {
  return (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={blogCreateHandler}>
        <p>
          title: <input {...newBlogTitle} />
        </p>
        <p>
          author: <input {...newBlogAuthor} />
        </p>
        <p>
          url: <input {...newBlogUrl} />
          {/* url: <input value={url} onChange={urlChangeHandler} /> */}
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
