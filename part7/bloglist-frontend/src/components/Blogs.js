import React from "react";
import { connect } from "react-redux";
import Blog from "./Blog";
import { setNotification } from "../reducers/notificationReducer";

const Blogs = props => {
  return (
    <div>
      {/* {blogs
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
        ))} */}
      <h2>Blogs</h2>
      {props.sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          //   setNotification={setNotification}
          //   blogs={blogs}
          //   setBlogs={setBlogs}
          userId={props.user.id}
        />
      ))}
    </div>
  );
};

const blogsToSort = ({ blogs }) => {
  return blogs.sort(function(a, b) {
    return b.likes - a.likes;
  });
};

const mapStateToProps = state => {
  return {
    sortedBlogs: blogsToSort(state)
  };
};

const mapDispatchToProps = {
  setNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs);
