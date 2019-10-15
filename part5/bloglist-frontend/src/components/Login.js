import React from "react";

const Login = ({ username, password, loginHandler }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginHandler}>
        <div>
          username <input {...username.fieldInfo} />
        </div>
        <div>
          password <input {...password.fieldInfo} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
