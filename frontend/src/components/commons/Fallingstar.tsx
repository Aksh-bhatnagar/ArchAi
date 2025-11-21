import React, { useMemo } from "react";

const FallingStars = () => {
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => {
      const style = {
        top: `${Math.random() * 100 - 10}%`,
        left: `${Math.random() * 110}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        opacity: Math.random(),
      };
      return <div key={i} className="star" style={style} />;
    });
  }, []); // ⭐ Runs only once

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars}
    </div>
  );
};

export default FallingStars;
