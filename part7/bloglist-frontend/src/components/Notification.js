import React from "react";
import { connect } from "react-redux";

const Notification = props => {
  if (props.notification === "") {
    return null;
  }
  return <p>{props.notification}</p>;
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Notification);
