import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./app.css";
import Login from "./components/Login";
import Notification from "./components/Notification";
import BlogPage from "./components/BlogPage.js";
import UsersPage from "./components/UsersPage";
import { initializeBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { logout, getLoggedInUser } from "./reducers/loginReducer";
import { getAllUsers } from "./reducers/userReducer";

const App = props => {
  useEffect(() => {
    props.initializeBlogs();
    props.getLoggedInUser();
    props.getAllUsers();
  }, []);

  const Menu = () => {
    const padding = {
      paddingRight: 5
    };
    return (
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>
    );
  };

  return (
    <div>
      <Notification />
      {props.user === null ? (
        <Login />
      ) : (
        <Router>
          <Menu />
          <p>
            {props.user.name} is logged in{" "}
            <button onClick={() => props.logout()}>logout</button>
          </p>
          <Route exact path="/" render={() => <BlogPage />} />
          <Route exact path="/users" render={() => <UsersPage />} />
        </Router>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    blogs: state.blogs,
    users: state.users
  };
};

const mapDispatchToProps = {
  initializeBlogs,
  setNotification,
  logout,
  getLoggedInUser,
  getAllUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
