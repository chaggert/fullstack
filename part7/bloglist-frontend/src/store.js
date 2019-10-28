import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";
import oneUserReducer from "./reducers/oneUserReducer";
import oneBlogReducer from "./reducers/oneBlogReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  loggedInUser: loginReducer,
  users: userReducer,
  user: oneUserReducer,
  blog: oneBlogReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
