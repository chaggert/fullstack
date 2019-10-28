import blogService from "../services/blogs";

const oneBlogReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ONE_BLOG":
      return action.data;
    default:
      return state;
  }
};

export const getOneBlog = id => {
  return async dispatch => {
    const blog = await blogService.getBlog(id);
    dispatch({
      type: "GET_ONE_BLOG",
      data: blog
    });
  };
};

export default oneBlogReducer;
