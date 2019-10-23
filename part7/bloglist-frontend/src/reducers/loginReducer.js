import loginService from "../services/login";
import blogService from "../services/blogs";

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      window.localStorage.setItem("loggedBlogappUser", action.data);
      return action.data;
    case "LOGOUT_USER":
      window.localStorage.removeItem("loggedBlogappUser");
      return null;
    case "GET_USER":
      const user = window.localStorage.getItem("loggedBlogappUser");
      console.log(user);
      if (user) {
        blogService.setToken(user.token);
        return user;
      }
      return state;
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
    const user = JSON.stringify(loggedInUser);
    console.log(user);
    blogService.setToken(user.token);
    dispatch({
      type: "LOGIN_USER",
      data: user
    });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: "LOGOUT_USER"
    });
  };
};

export const getLoggedInUser = () => {
  return dispatch => {
    dispatch({
      type: "GET_USER"
    });
  };
};

export default loginReducer;
