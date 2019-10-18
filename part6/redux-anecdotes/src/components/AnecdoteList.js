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
      {props.anecdotesToShow.map(anecdote => (
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes
    .sort(function(a, b) {
      return b.votes - a.votes;
    })
    .filter(anecdote => anecdote.content.includes(filter));
};

const mapStateToProps = state => {
  return {
    anecdotesToShow: anecdotesToShow(state)
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
