import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const updatedObject = action.data;
      return state.map(a => (a.id !== updatedObject.id ? a : updatedObject));
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};

export const createAnecdote = object => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(object);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote
    });
  };
};

export const voteFor = object => {
  return async dispatch => {
    const updatedObject = await anecdoteService.update({
      ...object,
      votes: object.votes + 1
    });
    dispatch({
      type: "VOTE",
      data: updatedObject
    });
  };
};

export default anecdoteReducer;
