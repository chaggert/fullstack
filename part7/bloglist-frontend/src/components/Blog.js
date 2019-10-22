import React, { useState } from "react";
import { connect } from "react-redux";
import { voteFor, removeBlog } from "../reducers/blogReducer";

const Blog = props => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  // const likeClickHandler = async event => {
  //   event.preventDefault();
  //   try {
  //     const newBlogObject = {
  //       ...blog,
  //       likes: blog.likes + 1
  //     };
  //     const returnedObject = await blogService.update(blog.id, newBlogObject);
  //     setNotification({
  //       message: "Liked!",
  //       type: "success"
  //     });
  //     setTimeout(() => {
  //       setNotification({ message: null, type: null });
  //     }, 2000);
  //     setBlogs(
  //       blogs.map(b => (b.id !== returnedObject.id ? b : returnedObject))
  //     );
  //   } catch (exception) {
  //     setNotification({
  //       message: `Error: ${exception.message}`,
  //       type: "error"
  //     });
  //     setTimeout(() => {
  //       setNotification({ message: null, type: null });
  //     }, 2000);
  //   }
  // };

  // const removeHandler = async event => {
  //   event.preventDefault();
  //   try {
  //     if (window.confirm("Are you sure you wish to remove this blog?")) {
  //       await blogService.remove(blog.id);
  //       setNotification({
  //         message: "Blog was successfully removed",
  //         type: "success"
  //       });
  //       setTimeout(() => {
  //         setNotification({ message: null, type: null });
  //       }, 2000);
  //       setBlogs(blogs.filter(b => b.id !== blog.id));
  //     }
  //   } catch (exception) {
  //     setNotification({
  //       message: `Error: ${exception.message}`,
  //       type: "error"
  //     });
  //     setTimeout(() => {
  //       setNotification({ message: null, type: null });
  //     }, 2000);
  //   }
  // };

  return (
    <div style={blogStyle} className="blogParent">
      <div
        onClick={() => setShowDetails(!showDetails)}
        className="detailToggler"
      >
        {props.blog.title} {props.blog.author}
      </div>
      {showDetails ? (
        <div className="blogDetails">
          <a href={props.blog.url}>{props.blog.url}</a>
          <p>
            {props.blog.likes} likes{" "}
            <button onClick={() => props.voteFor(props.blog)}>like!</button>
          </p>
          <p>{props.blog.user.name}</p>
          {props.blog.user.id === props.userId ? (
            <button onClick={() => props.removeBlog(props.blog)}>remove</button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = {
  voteFor,
  removeBlog
};

export default connect(
  null,
  mapDispatchToProps
)(Blog);
