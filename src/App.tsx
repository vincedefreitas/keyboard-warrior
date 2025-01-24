import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App: React.FC = () => {
  const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [activeLetters, setActiveLetters] = useState<{ id: number; letter: string; targetX: number; targetY: number; progress: number }[]>([]);
  const [letterId, setLetterId] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'hard' | 'pro'>('easy');
  const circleRef = useRef<HTMLDivElement>(null);

  const radius = 200; // Radius of the circle in pixels
  const difficultySettings = {
    easy: { speed: 3000, spawnInterval: 1200 },
    hard: { speed: 2000, spawnInterval: 800 },
    pro: { speed: 1200, spawnInterval: 500 },
  };

  const { speed, spawnInterval } = difficultySettings[difficulty];

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
    if (!gameActive) return;

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
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
  }, [gameActive, score, spawnInterval]);

  useEffect(() => {
    if (!gameActive) return;

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
  }, [gameActive, speed]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!gameActive) return;

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
  }, [gameActive]);

  const startGame = () => {
    setTimeLeft(60);
    setScore(0);
    setActiveLetters([]);
    setLetterId(0);
    setGameActive(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {!gameActive ? (
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <label className="mr-2">Select Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'easy' | 'hard' | 'pro')}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            >
              <option value="easy">Easy</option>
              <option value="hard">Hard</option>
              <option value="pro">Pro</option>
            </select>
          </div>
          <button
            onClick={startGame}
            className="px-6 py-3 mb-6 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {timeLeft === 0 ? 'Retry' : 'Start Game'}
          </button>
        </div>
      ) : (
        <>
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
                  transform: `translate(${x}px, ${y}px)`
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
                  transform: `translate(-50%, -50%)`
                }}
              >
                {letter}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
