import React, { useEffect, useState } from "react";

interface MovingDiv {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
}

const MovingBackground: React.FC = () => {
  const [divs, setDivs] = useState<MovingDiv[]>([]);

  useEffect(() => {
    const initializeDivs = () => {
      const colors = [
        "from-[#4043A3]",
        "from-[#A2336C]",
        "from-[#117973]",
        "from-[#5A3DAD]",
        "from-[#274F9F]",
      ];
      const numDivs = colors.length;
      const newDivs: MovingDiv[] = [];
      const speed = 0.75;

      for (let i = 0; i < numDivs; i++) {
        newDivs.push({
          x: Math.random() * (window.innerWidth - 240),
          y: Math.random() * (window.innerHeight - 240),
          dx: Math.random() < 0.5 ? speed : -speed,
          dy: Math.random() < 0.5 ? speed : -speed,
          color: colors[i],
        });
      }

      setDivs(newDivs);
    };

    const detectCollisions = (divs: MovingDiv[]): MovingDiv[] => {
      const radius = 120;
      const updatedDivs = [...divs];

      for (let i = 0; i < updatedDivs.length; i++) {
        for (let j = i + 1; j < updatedDivs.length; j++) {
          const dx = updatedDivs[j].x - updatedDivs[i].x;
          const dy = updatedDivs[j].y - updatedDivs[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < radius * 2) {

            const overlap = radius * 2 - distance;
            const nx = dx / distance; 
            const ny = dy / distance;
            
            updatedDivs[i].x -= (nx * overlap) / 2;
            updatedDivs[i].y -= (ny * overlap) / 2;
            updatedDivs[j].x += (nx * overlap) / 2;
            updatedDivs[j].y += (ny * overlap) / 2;

            const viDotN = updatedDivs[i].dx * nx + updatedDivs[i].dy * ny;
            const vjDotN = updatedDivs[j].dx * nx + updatedDivs[j].dy * ny;

            updatedDivs[i].dx += nx * (vjDotN - viDotN);
            updatedDivs[i].dy += ny * (vjDotN - viDotN);

            updatedDivs[j].dx += nx * (viDotN - vjDotN);
            updatedDivs[j].dy += ny * (viDotN - vjDotN);
          }
        }
      }

      return updatedDivs;
    };

    const moveDivs = () => {
      setDivs((currentDivs) => {
        let updatedDivs = currentDivs.map((div) => {
          let { x, y, dx, dy } = div;

          if (x < 0 || x > window.innerWidth - 240) dx *= -1; 
          if (y < 0 || y > window.innerHeight - 240) dy *= -1;

          return { ...div, x: x + dx, y: y + dy, dx, dy };
        });

        updatedDivs = detectCollisions(updatedDivs);

        return updatedDivs;
      });

      requestAnimationFrame(moveDivs);
    };

    initializeDivs();
    const animationId = requestAnimationFrame(moveDivs);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full h-full min-h-screen bg-[#161624] relative overflow-hidden">
      <div className="text-white text-3xl p-10">Score: 1234</div>
      {divs.map((div, index) => (
        <div
          key={index}
          className={`absolute h-60 w-60 bg-gradient-radial ${div.color} to-[#000000]/0 rounded-full blur-[15px]`}
          style={{
            transform: `translate(${div.x}px, ${div.y}px)`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default MovingBackground;
