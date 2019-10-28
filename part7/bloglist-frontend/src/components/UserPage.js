import React from "react";
import { connect } from "react-redux";

const UserPage = props => {
  if (props.user === undefined) {
    return null;
  }
  const generateBlogs = () => {
    return props.user.blogs.map(b => <li key={b.id}>{b.title}</li>);
  };
  return (
    <div>
      <h2>{props.user.name}</h2>
      <h4>added blogs</h4>
      {generateBlogs()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserPage);
