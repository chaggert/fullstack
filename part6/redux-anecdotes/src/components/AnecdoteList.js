import React from "react";
import { voteFor } from "../reducers/anecdoteReducer";
import {
  changeNotification,
  removeNotification
} from "../reducers/notificationReducer";

const AnecdoteList = ({ store }) => {
  const vote = anecdote => () => {
    store.dispatch(voteFor(anecdote.id));
    store.dispatch(changeNotification(`Voted for ${anecdote.content}`));
    setTimeout(() => {
      store.dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      {store
        .getState()
        .anecdotes.sort(function(a, b) {
          return b.votes - a.votes;
        })
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

// const mapStateToProps = state => {
//   return {
//     anecdotes: state.anecdotes,
//     notification: ""
//   };
// };

// const mapDispatchToProps = {
//   voteFor
// };

export default AnecdoteList;

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AnecdoteList);
