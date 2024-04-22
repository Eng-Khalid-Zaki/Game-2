import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";
export default function TimeChallenge({ title, targetTime }) {
  const [timeExpired, setTimeExpired] = useState(false);
  const [startTime, setStartTime] = useState(false);
  const timer = useRef();
  const dialog = useRef();

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimeExpired(true);
      dialog.current.showModal();
    }, targetTime * 1000);
    setStartTime(true);
  }

  function handleStop() {
    clearTimeout(timer.current);
    setStartTime(false);
  }

  return (
    <>
      <ResultModal ref={dialog} result="lost" targetTime={targetTime} />
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
          {startTime && !timeExpired
            ? "Time is running..."
            : "Time is inactive"}
        </p>
      </section>
    </>
  );
}
