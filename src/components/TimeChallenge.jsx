import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";
export default function TimeChallenge({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timer = useRef();
  const dialog = useRef();
  const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }
  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }
  function handleStart() {
    timer.current = setInterval(
      () => setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10),
      10
    );
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        remainingTime={timeRemaining}
        onReset={handleReset}
        targetTime={targetTime}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <button onClick={timeIsActive ? handleStop : handleStart}>
          {timeIsActive ? "Stop" : "Start"} Challenge
        </button>
        <p>{timeIsActive ? "Time is running..." : "Time is inactive"}</p>
      </section>
    </>
  );
}
