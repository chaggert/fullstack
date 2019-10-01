import React from "react";

const Statistic = props => {
  return (
    <div>
      <p>
        {props.name} {props.value}
      </p>
    </div>
  );
};

export default Statistic;
