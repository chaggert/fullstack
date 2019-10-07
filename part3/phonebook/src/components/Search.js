import React from "react";

const Search = props => {
  return (
    <div>
      <div>
        Search contacts:{" "}
        <input
          value={props.filter}
          onChange={props.filterChangeHandler}
        ></input>
      </div>
    </div>
  );
};

export default Search;
