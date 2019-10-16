import React from "react";
import { voteFor, createAnecdote } from "./reducers/anecdoteReducer";

const App = props => {
  const anecdotes = props.store.getState();

  const addAnecdote = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.store.dispatch(createAnecdote(content));
  };

  const vote = id => {
    props.store.dispatch(voteFor(id));
  };
  return (
    <div>
      <h2>Anecdotes</h2>
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
