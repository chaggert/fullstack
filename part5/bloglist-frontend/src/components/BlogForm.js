import React from "react";

const BlogForm = ({
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl,
  blogCreateHandler
}) => {
  return (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={blogCreateHandler}>
        <p>
          title: <input {...newBlogTitle.fieldInfo} />
        </p>
        <p>
          author: <input {...newBlogAuthor.fieldInfo} />
        </p>
        <p>
          url: <input {...newBlogUrl.fieldInfo} />
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
