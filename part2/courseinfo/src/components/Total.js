import React from "react";

const Total = ({ parts }) => {
  const total = () => {
    let sum = parts.reduce((total, current) => total + current.exercises, 0);
    return sum;
  };

  return (
    <div>
      <p>total of {total()} exercises</p>
    </div>
  );
};

export default Total;
