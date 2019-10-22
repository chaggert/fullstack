const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    case "REMOVE_NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};

export const setNotification = (message, t) => {
  return dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification: message
    });
    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
        notification: ""
      });
    }, t * 1000);
  };
};

export default notificationReducer;
