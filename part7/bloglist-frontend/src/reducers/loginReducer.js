import loginService from "../services/login";
import blogService from "../services/blogs";

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.loggedInUser;
    case "GET_USER":
      return action.loggedInUser;
    case "LOGOUT_USER":
      window.localStorage.removeItem("loggedBlogappUser");
      return null;
    default:
      return state;
  }
};

export const login = (username, password) => {
  return async dispatch => {
    const retrievedLoggedInUser = await loginService.login({
      username: username,
      password: password
    });
    const userString = JSON.stringify(retrievedLoggedInUser);
    window.localStorage.setItem("loggedBlogappUser", userString);
    blogService.setToken(retrievedLoggedInUser.token);
    dispatch({
      type: "LOGIN_USER",
      loggedInUser: retrievedLoggedInUser
    });
  };
};

export const getLoggedInUser = () => {
  return dispatch => {
    let user;
    if (window.localStorage.getItem("loggedBlogappUser")) {
      user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
      blogService.setToken(user.token);
    } else {
      user = null;
    }
    dispatch({
      type: "GET_USER",
      loggedInUser: user
    });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: "LOGOUT_USER",
      loggedInUser: null
    });
  };
};

export default loginReducer;
