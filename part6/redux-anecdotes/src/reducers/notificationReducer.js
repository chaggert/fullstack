const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    case "REMOVE_NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};

export const setNotification = (notification, t) => {
  return dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification
    });
    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
        notification: null
      });
    }, t * 1000);
  };
};

export default notificationReducer;
