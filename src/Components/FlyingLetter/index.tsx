import useWindowSize from "../../hooks/useWindowSize";

interface FlyingLetterProps {
  letter: string;
  angle: number;
  progress: number;
  size: number;
  colors: {
    bg: string;
    border: string;
  };
}
export function FlyingLetter({
  letter,
  angle,
  progress,
  size,
  colors,
}: FlyingLetterProps) {
  const { width, height } = useWindowSize();
  const radius = Math.min(width, height) * 0.45 * progress;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${colors.bg} rounded-full flex items-center justify-center text-white font-bold border-2 ${colors.border}`}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: 1 - Math.abs(1 - progress),
      }}
    >
      {letter}
    </div>
  );
}

export default FlyingLetter;
