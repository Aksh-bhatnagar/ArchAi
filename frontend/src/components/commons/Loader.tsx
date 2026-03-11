import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ text }: { text: string }) {
  const container = useRef<HTMLDivElement>(null);
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    if (!lines.current.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

      tl
        // FLOORPLAN -> HOUSE
        .to(lines.current[0], { attr: { x1: 50, y1: 65, x2: 100, y2: 30 }, duration: 0.8 }) // roof left
        .to(lines.current[1], { attr: { x1: 100, y1: 30, x2: 150, y2: 65 }, duration: 0.8 }, "<") // roof right
        .to(lines.current[2], { attr: { x1: 140, y1: 60, x2: 140, y2: 130 }, duration: 0.8 }, "<") // right wall
        .to(lines.current[3], { attr: { x1: 60, y1: 60, x2: 60, y2: 130 }, duration: 0.8 }, "<") // left wall
        .to(lines.current[4], { attr: { x1: 85, y1: 90, x2: 115, y2: 90 }, duration: 0.8 }, "<") // door top
        .to(lines.current[5], { attr: { x1: 120, y1: 30, x2: 120, y2: 50 }, duration: 0.8 }, "<") // chimney vertical
        .to(lines.current[6], { attr: { x1: 140, y1: 130, x2: 60, y2: 130 }, duration: 0.8 }, "<") // base
        .to(lines.current[7], { attr: { x1: 85, y1: 130, x2: 85, y2: 90 }, duration: 0.8 }, "<") // door left
        .to(lines.current[8], { attr: { x1: 115, y1: 130, x2: 115, y2: 90 }, duration: 0.8 }, "<") // door right


        // HOUSE -> FLOORPLAN
        .to(lines.current[0], { attr: { x1: 30, y1: 30, x2: 170, y2: 30 }, duration: 0.8, delay: 1 })
        .to(lines.current[1], { attr: { x1: 170, y1: 30, x2: 170, y2: 170 }, duration: 0.8 }, "<")
        .to(lines.current[2], { attr: { x1: 170, y1: 170, x2: 30, y2: 170 }, duration: 0.8 }, "<")
        .to(lines.current[3], { attr: { x1: 30, y1: 170, x2: 30, y2: 30 }, duration: 0.8 }, "<")
        .to(lines.current[4], { attr: { x1: 100, y1: 30, x2: 100, y2: 120 }, duration: 0.8 }, "<")
        .to(lines.current[5], { attr: { x1: 30, y1: 90, x2: 100, y2: 90 }, duration: 0.8 }, "<")
        .to(lines.current[6], { attr: { x1: 100, y1: 70, x2: 170, y2: 70 }, duration: 0.8 }, "<")
        .to(lines.current[7], { attr: { x1: 100, y1: 120, x2: 170, y2: 120 }, duration: 0.8 }, "<")
        .to(lines.current[8], { attr: { x1: 140, y1: 120, x2: 140, y2: 170 }, duration: 0.8 }, "<");
    }, container);

    return () => ctx.revert();
  }, []);

  // DOT LOOP
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={container}
      className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm z-50"
    >
      <svg
        width="160"
        height="160"
        viewBox="0 0 200 200"
        stroke="#ffffff"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      >
        {[
          [30,30,170,30],
          [170,30,170,170],
          [170,170,30,170],
          [30,170,30,30],
          [100,30,100,120],
          [30,90,100,90],
          [100,70,170,70],
          [120,120,170,120],
          [140,120,140,170],
        ].map((coords, i) => (
          <line
            key={i}
            ref={(el) => {
              lines.current[i] = el;
            }}
            x1={coords[0]}
            y1={coords[1]}
            x2={coords[2]}
            y2={coords[3]}
          />
        ))}
      </svg>

      <div className="flex items-center text-xl text-white font-medium tracking-wide">
        {text}
        {text != "" && <span className="ml-1 w-8 text-left inline-block">
          {".".repeat(dotCount)}
        </span> }
      </div>
    </div>
  );
}