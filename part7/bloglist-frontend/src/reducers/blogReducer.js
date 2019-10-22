import blogService from "../services/blogs";

export const asObject = (title, author, url) => {
  return {
    title: title,
    author: author,
    url: url,
    user: {
      username: "chaggert",
      name: "First Last",
      id: "5d9f48e7e4ebf7371ccd0a1f"
    }, //Set user based on token
    likes: 0
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const updatedObject = action.data;
      return state.map(b => (b.id !== updatedObject.id ? b : updatedObject));
    case "NEW_BLOG":
      return [...state, action.data];
    case "INIT_BLOGS":
      return action.data;
    case "REMOVE_BLOG":
      return action.data;
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    });
  };
};

export const createBlog = (title, author, url) => {
  return async dispatch => {
    const newBlog = await blogService.create(asObject(title, author, url));
    dispatch({
      type: "NEW_BLOG",
      data: newBlog
    });
  };
};

export const removeBlog = object => {
  return async dispatch => {
    await blogService.remove(object.id);
    const newBlogs = await blogService.getAll();
    dispatch({
      type: "REMOVE_BLOG",
      data: newBlogs
    });
  };
};

export const voteFor = object => {
  return async dispatch => {
    const updatedObject = await blogService.update(object.id, {
      ...object,
      likes: object.likes + 1
    });
    dispatch({
      type: "VOTE",
      data: updatedObject
    });
  };
};

export default blogReducer;
