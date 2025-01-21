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
        onComplete();
        setShowGo(true);
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStart, onComplete]);

  useEffect(() => {
    if (showGo) {
      const timer = setTimeout(() => setShowGo(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showGo]);

  if (!timerStart) return null;

  return (
    <div className="w-full h-full rounded-full absolute flex justify-center items-center z-10">
      {timeLeft > 0 ? (
        <h1 className="w-size text-9xl text-white p-4">{timeLeft}</h1>
      ) : showGo ? (
        <p className="w-36 h-36 text-5xl text-white bg-green-600 border-8 border-green-400 p-4 rounded-full flex justify-center items-center">GO!</p>
      ) : null}
    </div>
  );
}

export default CountdownTimer;
