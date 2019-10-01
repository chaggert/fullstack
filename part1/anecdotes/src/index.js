import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  const generateNewAnecdoteReference = () => {
    let generatedValue;
    generatedValue = Math.floor(Math.random() * anecdotes.length);
    setSelected(generatedValue);
  };

  const voteForAnecdote = selected => {
    let newVotes = { ...votes };
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const anecdoteIndexWithTheMostVotes = () => {
    let mostVoted = Object.keys(votes).reduce((a, b) =>
      votes[a] > votes[b] ? a : b
    );
    console.log(mostVoted);
    return mostVoted;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => voteForAnecdote(selected)}>
        vote for this anecdote
      </button>
      <button onClick={() => generateNewAnecdoteReference()}>
        next anecdote
      </button>
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdotes[anecdoteIndexWithTheMostVotes()]}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
