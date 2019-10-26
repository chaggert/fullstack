import loginService from "../services/login";
import blogService from "../services/blogs";

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.user;
    case "GET_USER":
      return action.user;
    case "LOGOUT_USER":
      window.localStorage.removeItem("loggedBlogappUser");
      return null;
    default:
      return state;
  }
};

export const login = (username, password) => {
  return async dispatch => {
    const loggedInUser = await loginService.login({
      username: username,
      password: password
    });
    const userString = JSON.stringify(loggedInUser);
    window.localStorage.setItem("loggedBlogappUser", userString);
    blogService.setToken(loggedInUser.token);
    dispatch({
      type: "LOGIN_USER",
      user: loggedInUser
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
      user: user
    });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: "LOGOUT_USER",
      user: null
    });
  };
};

export default loginReducer;
