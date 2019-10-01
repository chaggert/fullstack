import React, { useState } from "react";
import ReactDOM from "react-dom";

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
      <button onClick={() => setReview("good")}>good</button>
      <button onClick={() => setReview("neutral")}>neutral</button>
      <button onClick={() => setReview("bad")}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
