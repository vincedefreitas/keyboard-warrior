import "./App.css";
import TargetLetter from "./Components/TargetLetter/TargetLetter";
import MovingBackground from "./Components/Background";
import FlyingLetters from "./Components/FlyingLetters";

const LETTER_COLORS = {
  Q: {
    bg: "bg-red-500",
    border: "border-red-300",
  },
  W: {
    bg: "bg-orange-500",
    border: "border-orange-300",
  },
  E: {
    bg: "bg-yellow-500",
    border: "border-yellow-300",
  },
  R: {
    bg: "bg-green-500",
    border: "border-green-300",
  },
  T: {
    bg: "bg-teal-500",
    border: "border-teal-300",
  },
  Y: {
    bg: "bg-blue-500",
    border: "border-blue-300",
  },
  U: {
    bg: "bg-indigo-500",
    border: "border-indigo-300",
  },
  I: {
    bg: "bg-purple-500",
    border: "border-purple-300",
  },
  O: {
    bg: "bg-pink-500",
    border: "border-pink-300",
  },
  P: {
    bg: "bg-red-600",
    border: "border-red-400",
  },
  A: {
    bg: "bg-orange-600",
    border: "border-orange-400",
  },
  S: {
    bg: "bg-yellow-600",
    border: "border-yellow-400",
  },
  D: {
    bg: "bg-green-600",
    border: "border-green-400",
  },
  F: {
    bg: "bg-teal-600",
    border: "border-teal-400",
  },
  G: {
    bg: "bg-blue-600",
    border: "border-blue-400",
  },
  H: {
    bg: "bg-indigo-600",
    border: "border-indigo-400",
  },
  J: {
    bg: "bg-purple-600",
    border: "border-purple-400",
  },
  K: {
    bg: "bg-pink-600",
    border: "border-pink-400",
  },
  L: {
    bg: "bg-red-700",
    border: "border-red-500",
  },
  Z: {
    bg: "bg-orange-700",
    border: "border-orange-500",
  },
  X: {
    bg: "bg-yellow-700",
    border: "border-yellow-500",
  },
  C: {
    bg: "bg-green-700",
    border: "border-green-500",
  },
  V: {
    bg: "bg-teal-700",
    border: "border-teal-500",
  },
  B: {
    bg: "bg-blue-700",
    border: "border-blue-500",
  },
  N: {
    bg: "bg-indigo-700",
    border: "border-indigo-500",
  },
  M: {
    bg: "bg-purple-700",
    border: "border-purple-500",
  },
} as const;

const LETTERS = Object.keys(LETTER_COLORS) as Array<keyof typeof LETTER_COLORS>;
const TARGET_SIZE = 50;

function App() {
  return LETTERS.map((letter, index) => {
    const angle = (index / LETTERS.length) * Math.PI * 2 - Math.PI / 2;
    return (
      <>
      <MovingBackground/>
      <TargetLetter
        key={letter}
        letter={letter}
        angle={angle}
        size={TARGET_SIZE}
        colors={LETTER_COLORS[letter]}
      />
      </>
    );
  });
}


export default App
