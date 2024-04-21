import { useState, useRef } from "react";
export default function TimeChallenge({ title, targetTime }) {
  const [timeExpired, setTimeExpired] = useState(false);
  const [startTime, setStartTime] = useState(false);
  const timer = useRef();
  function handleStart() {
    timer.current = setTimeout(() => {
      setTimeExpired(true);
    }, targetTime * 1000);
    setStartTime(true);
  }
  function handleStop() {
    clearTimeout(timer.current);
    setStartTime(false);
  }
  return (
    <section className="challenge">
      <h2>{title}</h2>
      <p>{timeExpired ? "You lost!" : ""}</p>
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <button onClick={startTime ? handleStop : handleStart}>
        {startTime && !timeExpired ? "Stop" : "Start"} Challenge
      </button>
      <p>
        {startTime && !timeExpired ? "Time is running..." : "Time is inactive"}
      </p>
    </section>
  );
}
