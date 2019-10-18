import React from "react";
import { connect } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = props => {
  const vote = anecdote => () => {
    props.voteFor(anecdote);
    props.setNotification(`you voted '${anecdote.content}'`, 3);
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
  setNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
