import React from "react";
import { connect } from "react-redux";
import { login } from "../reducers/loginReducer";

const Login = props => {
  const loginUser = async event => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    event.target.username.value = "";
    event.target.password.value = "";
    props.login(username, password);
    // props.setUser(loggedInUser);
  };
  return (
    <div>
      <h2>Log into application</h2>
      <form onSubmit={loginUser}>
        <p>
          username: <input name="username" />
        </p>
        <p>
          password: <input type="password" name="password" />
        </p>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

// const Login = ({ username, password, loginHandler }) => {
//   return (
//     <div>
//       <h2>Log in to application</h2>
//       <form onSubmit={loginHandler}>
//         <div>
//           username <input {...username.fieldInfo} />
//         </div>
//         <div>
//           password <input {...password.fieldInfo} />
//         </div>
//         <button type="submit">login</button>
//       </form>
//     </div>
//   );
// };

export default connect(
  null,
  { login }
)(Login);
