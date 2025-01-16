interface TargetLetterProps {
  letter: string;
  angle: number;
  size: number;
  colors: {
    bg: string;
    border: string;
  };
}

function TargetLetter({ letter, angle, size, colors }: TargetLetterProps) {
  const radius = Math.min(window.innerWidth, window.innerHeight) * 0.45;
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
      }}
    >
      {letter}
    </div>
  );
}

export default TargetLetter;
