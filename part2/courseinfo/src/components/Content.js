import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  const generatePartList = () =>
    parts.map(part => <Part key={part.id} part={part}></Part>);

  return <div>{generatePartList()}</div>;
};

export default Content;
