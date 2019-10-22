import loginService from "../services/login";
import blogService from "../services/blogs";

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.data;
    case "LOGOUT_USER":
      return action.data;
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
    window.localStorage.setItem("loggedBlogappUser", user);
    blogService.setToken(user.token);
    dispatch({
      type: "LOGIN_USER",
      data: user
    });
  };
};

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch({
      type: "LOGOUT_USER",
      data: null
    });
  };
};

export default loginReducer;
