import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  mode: "login" | "signup";
};

export function HouseSvg({ mode }: Props) {
  const roof = useRef<SVGPathElement>(null);
  const slab = useRef<SVGRectElement>(null);
  const chimney = useRef<SVGRectElement>(null);
  const walls = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (mode === "signup") {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.to(chimney.current, { y: 35, opacity: 0, duration: 0.5 })
        .to(slab.current, { x:15 , width: 20, duration: 0.5 })
        .to(roof.current, { scale: 0.85, y: -45, duration: 0.5 })
        .to(walls.current, { y: -92, height: 262, duration: 0.5 })
        .to(slab.current, { opacity: 0 })
        .to(slab.current, { width: 220, y:-105, x:0 ,height:24, opacity: 1, rotate: -4, duration: 0.5 })
        .to(chimney.current, { y: -85, scaleX: 1.1, height: 45, opacity: 1, duration: 0.5 })
        .to(roof.current, { scale: 0.2, y: -355, x: 50, duration: 0.5 });
    }

    if (mode === "login") {
      gsap.to([roof.current, slab.current, chimney.current, walls.current], {
        clearProps: "all",
        duration: 0.4,
      });
    }
  }, [mode]);

  return (
    <svg viewBox="0 -100 225 325" className="w-120 h-150">
      {/* TRIANGLE ROOF */}
      <path
        ref={roof}
        d="M 15 70 Q -1 71 12 62 L 105 8 Q 115 2 125 8 L 218 62 Q 231 71 215 70 Z"
             //"M 15 75 L 105 28 L 218 75 Z"
        fill="#4f6396"
        transform-origin="50% 100%"
      />

      {/* SLAB ROOF */}
      <rect
        ref={slab}
        x="5"
        y="65"
        width="220" //205
        height="20"  //18
        rx={6}
        fill="#4f6396"
        style={{ transformOrigin: "50% 50%" }}
      />

      {/* CHIMNEY */}
      <rect
        ref={chimney}
        x="155"
        y="5"
        width="22"
        height="40"
        rx={3}
        fill="#4f6396"
        style={{ transformOrigin: "50% 100%" }}
      />

      {/* WALLS */}
      <rect
        ref={walls}
        x="20"
        y="55"
        width="190"
        height="170"
        rx={10}
        fill="#4f6396"
      />
    </svg>
  );
}

