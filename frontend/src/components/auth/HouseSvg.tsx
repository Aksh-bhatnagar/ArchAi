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

  const timeline = useRef<gsap.core.Timeline | null>(null);

  /* BUILD TIMELINE ONCE */
  useEffect(() => {
    if (!roof.current || !slab.current || !chimney.current || !walls.current) return;

    timeline.current = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.inOut" },
    });

    timeline.current
      .to(chimney.current, { y: 35, opacity: 0, duration: 0.2 })
      .to(slab.current, { x: 15, width: 20, duration: 0.2 })
      .to(roof.current, { scale: 0.85, y: -45, duration: 0.2 })
      .to(walls.current, { y: -92, height: 262, duration: 0.2 })
      .to(slab.current, { x: 15, y: -110 , duration: 0.2 }, "<")
      .to(roof.current, { scale: 0.2, duration: 0.3 }, "<")
      .to(slab.current, { width: 220 ,y: -110, x: 10, height:24, opacity: 1, rotate: -4, duration: 0.2 })
      .to(chimney.current, { y: -85, scaleX: 1.1, height: 45, opacity: 1, duration: 0.2 })
      .to(roof.current, { scale: 0.2, y: -355, x: 38, duration: 0.2 }, "<");
  }, []);

  /* PLAY / REVERSE */
  useEffect(() => {
    if (!timeline.current) return;

    if (mode === "signup") {
      timeline.current.play();
    } else {
      timeline.current.reverse();
    }
  }, [mode]);

  return (
    <svg viewBox="0 -100 225 325" className="w-full h-full">
      {/* TRIANGLE ROOF */}
      <path
        ref={roof}
        d="M 12 70 Q -4 71 9 62 L 102 8 Q 112 2 122 8 L 215 62 Q 228 71 212 70 Z"
        fill="#4f6396"
        transform-origin="50% 100%"
      />

      {/* SLAB ROOF */}
      <rect
        ref={slab}
        x="2"
        y="65"
        width="220"
        height="20"
        rx={6}
        fill="#4f6396"
        style={{ transformOrigin: "50% 50%" }}
      />

      {/* CHIMNEY */}
      <rect
        ref={chimney}
        x="152"
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
        x="17"
        y="55"
        width="191"
        height="170"
        rx={10}
        fill="#4f6396"
      />
    </svg>
  );
}
