import { useEffect, useState } from "react";

interface CountdownTimerProps {
  timerStart: boolean;
  onComplete: () => void;
}

function CountdownTimer({ timerStart, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(3);
  const [showGo, setShowGo] = useState(false);

  useEffect(() => {
    if (!timerStart) return;

    setTimeLeft(3);
    setShowGo(false);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(interval);
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStart]);

  useEffect(() => {
    if (timeLeft === 0 && timerStart) {
      setShowGo(true);

      const goTimeout = setTimeout(() => {
        setShowGo(false);
        onComplete();
      }, 1000);

      return () => clearTimeout(goTimeout);
    }
  }, [timeLeft, timerStart, onComplete]);

  if (!timerStart) return null;

  return (
    <div className="w-full h-full absolute flex justify-center items-center z-10">
      {timeLeft > 0 ? (
        <h1 className="w-36 h-36 text-5xl text-red-400 bg-red-100 border-8 border-red-200 p-4 rounded-full flex justify-center items-center">{timeLeft}</h1>
      ) : showGo ? (
        <p
          className="w-36 h-36 text-5xl text-white bg-green-600 border-8 border-green-400 p-4 rounded-full flex justify-center items-center"
          style={{ transition: "transform 1s ease-in-out" }}
        >
          GO!
        </p>
      ) : null}
    </div>
  );
}

export default CountdownTimer;
