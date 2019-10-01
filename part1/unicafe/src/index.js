import React, { useState } from "react";
import ReactDOM from "react-dom";
import Statistic from "./components/Statistic";
import Button from "./components/Button";

const Statistics = ({ good, neutral, bad }) => {
  let stats;
  if (good + neutral + bad !== 0) {
    stats = (
      <div>
        <Statistic name="good" value={good} />
        <Statistic name="neutral" value={neutral} />
        <Statistic name="bad" value={bad} />
        <Statistic name="all" value={good + neutral + bad} />
        <Statistic
          name="average"
          value={(1 * good - 1 * bad) / (good + neutral + bad)}
        />
        <Statistic
          name="% positive"
          value={(100 * good) / (good + neutral + bad)}
        />
      </div>
    );
  } else {
    stats = <p>No feedback given</p>;
  }

  return (
    <div>
      <h1>statistics</h1>
      {stats}
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setReview = newReview => {
    switch (newReview) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={() => setReview("good")} />
      <Button name="neutral" handleClick={() => setReview("neutral")} />
      <Button name="bad" handleClick={() => setReview("bad")} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
