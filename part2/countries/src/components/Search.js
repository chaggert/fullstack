import React from "react";

const Search = ({ filter, filterChangeHandler }) => {
  return (
    <div>
      Search countries:{" "}
      <input value={filter} onChange={filterChangeHandler}></input>
    </div>
  );
};

export default Search;
