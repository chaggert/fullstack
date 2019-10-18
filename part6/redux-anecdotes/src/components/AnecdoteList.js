import React from "react";
import { connect } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import {
  changeNotification,
  removeNotification
} from "../reducers/notificationReducer";

const AnecdoteList = props => {
  const vote = anecdote => () => {
    props.voteFor(anecdote.id);
    props.changeNotification(`Voted for ${anecdote.content}`);
    setTimeout(() => {
      props.removeNotification();
    }, 5000);
  };

  return (
    <div>
      {props.anecdotes
        .sort(function(a, b) {
          return b.votes - a.votes;
        })
        .filter(anecdote => anecdote.content.includes(props.filter))
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

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

const mapDispatchToProps = {
  voteFor,
  changeNotification,
  removeNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
