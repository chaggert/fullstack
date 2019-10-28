import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import { getOneBlog } from "../reducers/oneBlogReducer";

const Blogs = props => {
  const padding = {
    paddingRight: 5
  };
  return (
    <div>
      <h2>Blogs</h2>
      {props.sortedBlogs.map(blog => (
        <div key={blog.id}>
          <Link
            style={padding}
            to={`/blogs/${blog.id}`}
            onClick={() => props.getOneBlog(blog.id)}
          >
            {blog.title}
          </Link>
        </div>
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
    sortedBlogs: blogsToSort(state),
    blog: state.blog
  };
};

const mapDispatchToProps = {
  setNotification,
  getOneBlog
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs);
