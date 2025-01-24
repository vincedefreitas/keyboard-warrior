import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App: React.FC = () => {
  const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [activeLetters, setActiveLetters] = useState<{ id: number; letter: string; targetX: number; targetY: number; progress: number }[]>([]);
  const [letterId, setLetterId] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);

  const radius = 200; // Radius of the circle in pixels
  const speed = 2000; // Speed of animation in milliseconds
  const spawnInterval = 1000; // Interval between new letters spawning

  // Place letters in a circular layout
  const getLetterPositions = () => {
    const angleStep = (2 * Math.PI) / letters.length;
    return letters.map((letter, index) => {
      const angle = -Math.PI / 2 + angleStep * index; // Start at the top, move anti-clockwise
      return {
        letter,
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
      };
    });
  };

  // Randomly generate a letter and animate it
  const spawnLetter = () => {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const target = getLetterPositions().find((pos) => pos.letter === randomLetter);
    if (target) {
      setActiveLetters((prev) => [
        ...prev,
        { id: letterId, letter: randomLetter, targetX: target.x, targetY: target.y, progress: 0 },
      ]);
      setLetterId((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert(`Game Over! Your score: ${score}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Spawn letters at intervals
    const letterInterval = setInterval(spawnLetter, spawnInterval);

    return () => {
      clearInterval(timer);
      clearInterval(letterInterval);
    };
  }, [score]);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setActiveLetters((prev) =>
        prev
          .map((letter) => {
            const newProgress = letter.progress + 20 / speed;
            if (newProgress >= 1) {
              return null; // Mark letter for removal once it reaches its target
            }
            return { ...letter, progress: newProgress };
          })
          .filter((letter) => letter !== null)
      );
    }, 20);

    return () => clearInterval(animationInterval);
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    const pressedKey = event.key.toUpperCase();
    setActiveLetters((prev) => {
      return prev.filter((letter) => {
        if (letter.letter === pressedKey) {
          const accuracy = Math.abs(1 - letter.progress);
          if (accuracy < 0.1) {
            setScore((score) => score + 5); // Perfect line-up
          } else if (accuracy < 0.3) {
            setScore((score) => score + 1); // Close line-up
          }
          return false; // Remove the letter
        }
        return true;
      });
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="absolute top-4 left-4 text-lg">Time: {timeLeft}</div>
      <div className="absolute top-4 right-4 text-lg">Score: {score}</div>

      <div
        ref={circleRef}
        className="relative flex items-center justify-center rounded-full border border-white"
        style={{ width: radius * 2, height: radius * 2 }}
      >
        {getLetterPositions().map(({ letter, x, y }) => (
          <div
            key={letter}
            className="absolute text-sm font-bold"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            {letter}
          </div>
        ))}

        {activeLetters.map(({ id, letter, targetX, targetY, progress }) => (
          <div
            key={id}
            className="absolute text-xl font-bold text-red-500"
            style={{
              left: `calc(50% + ${progress * targetX}px)`,
              top: `calc(50% + ${progress * targetY}px)`,
              transform: `translate(-50%, -50%)`,
            }}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
