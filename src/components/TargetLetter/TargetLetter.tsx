
interface TargetLetterProps {
  letter: string;
  angle: number;
  size: number;
  colors: {
    bg: string;
    border: string;
  };
  radius: number
}

function TargetLetter({ letter, angle, size, colors, radius }: TargetLetterProps) {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return (
    <div
      className={` transition-left transition-top duration-700 absolute transform -translate-x-1/2 -translate-y-1/2 ${colors.bg} rounded-full flex items-center justify-center text-white font-bold border-2 ${colors.border} `}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        width: `${size}px`,
        height: `${size}px`
      }}
      aria-label="Target letter"
    >
      {letter}
    </div>
  );
}

export default TargetLetter;
