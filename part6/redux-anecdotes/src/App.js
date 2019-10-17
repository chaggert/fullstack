import React from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";

const App = props => {
  const store = props.store;

  return (
    <div>
      <h2>Anecdotes</h2>
      {store.getState().notification !== null ? (
        <Notification store={store} />
      ) : null}

      <AnecdoteForm store={store} />
      <AnecdoteList store={store} />
    </div>
  );
};

export default App;
