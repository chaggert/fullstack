import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getOneUser } from "../reducers/oneUserReducer";

const UsersPage = props => {
  const padding = {
    paddingRight: 5
  };
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(u => (
            <tr key={u.id}>
              <td>
                <Link
                  style={padding}
                  to={`/users/${u.id}`}
                  onClick={() => props.getOneUser(u.id)}
                >
                  {u.name}
                </Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users,
    user: state.user
  };
};

const mapDispatchToProps = {
  getOneUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage);
