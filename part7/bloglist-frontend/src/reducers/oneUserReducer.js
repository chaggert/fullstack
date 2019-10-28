import userService from "../services/users";

const oneUserReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ONE_USER":
      return action.data;
    default:
      return state;
  }
};

export const getOneUser = id => {
  return async dispatch => {
    const user = await userService.getUser(id);
    dispatch({
      type: "GET_ONE_USER",
      data: user
    });
  };
};

export default oneUserReducer;
