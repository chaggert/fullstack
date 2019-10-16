import React from "react";
import { voteFor } from "../reducers/anecdoteReducer";

const AnecdoteList = props => {
  const anecdotes = props.store.getState();

  const vote = id => {
    props.store.dispatch(voteFor(id));
  };
  return (
    <div>
      {anecdotes
        .sort(function(a, b) {
          return b.votes - a.votes;
        })
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
