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

    setTimeLeft(3); // Reset timer when it starts
    setShowGo(false); // Reset "Go!" visibility
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(interval);
        onComplete(); // Call onComplete when timer ends
        setShowGo(true); // Show "Go!" when countdown ends
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStart, onComplete]);

  useEffect(() => {
    if (showGo) {
      const timer = setTimeout(() => setShowGo(false), 1000); // Hide "Go!" after 1 second
      return () => clearTimeout(timer);
    }
  }, [showGo]);

  if (!timerStart) return null;

  return (
    <div className="w-full h-full rounded-full absolute flex justify-center items-center z-10">
      {timeLeft > 0 ? (
        <h1 className="w-size text-9xl text-white p-4">{timeLeft}</h1>
      ) : showGo ? (
        <p className="w-36 h-36 text-4xl text-white bg-green-600 border-8 border-green-400 p-4 rounded-full flex justify-center items-center">Go!</p>
      ) : null}
    </div>
  );
}

export default CountdownTimer;
