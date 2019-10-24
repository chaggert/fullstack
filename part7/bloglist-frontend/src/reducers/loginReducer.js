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
    const user = JSON.stringify(loggedInUser);
    console.log(user);
    window.localStorage.setItem("loggedBlogappUser", user);
    blogService.setToken(user.token);
    dispatch({
      type: "LOGIN_USER",
      user: user
    });
  };
};

export const getLoggedInUser = () => {
  return dispatch => {
    const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
    if (user) {
      blogService.setToken(user.token);
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
      type: "LOGOUT_USER"
    });
  };
};

// export const getLoggedInUser = () => {
//   return dispatch => {
//     dispatch({
//       type: "GET_USER"
//     });
//   };
// };

// export const setUser = () => {
//   return dispatch => {
//     dispatch({
//       type: "SET_USER"
//     });
//   };
// };

export default loginReducer;
