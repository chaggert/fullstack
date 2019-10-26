import blogService from "../services/blogs";

export const asObject = (title, author, url, blogUser) => {
  console.log(blogUser.username);
  return {
    title: title,
    author: author,
    url: url,
    user: {
      username: blogUser.username,
      name: blogUser.name,
      id: blogUser.id
    },
    likes: 0
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const updatedObject = action.data;
      return state.map(b => (b.id !== updatedObject.id ? b : updatedObject));
    case "NEW_BLOG":
      if (action.data) {
        return [...state, action.data];
      } else {
        return state;
      }

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

export const createBlog = (title, author, url, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(
      asObject(title, author, url, user)
    );
    dispatch({
      type: "NEW_BLOG",
      data: newBlog
    });
  };
};

export const removeBlog = object => {
  return async dispatch => {
    await blogService.remove(object.id);
    const blogs = await blogService.getAll();
    dispatch({
      type: "REMOVE_BLOG",
      data: blogs
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
