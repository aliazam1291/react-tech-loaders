import React, { useEffect, useState } from "react";

interface TechLoaderProps {
  onDone: () => void;
}

const TechLoader: React.FC<TechLoaderProps> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 100) {
      const timeout = setTimeout(() => setProgress(progress + 1), 15);
      return () => clearTimeout(timeout);
    } else {
      const outTimeout = setTimeout(() => onDone(), 400);
      return () => clearTimeout(outTimeout);
    }
  }, [progress, onDone]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0,
      width: "100vw", height: "100vh",
      background: "radial-gradient(ellipse at center, #10182a 65%, #1b1c35 100%)",
      backdropFilter: "blur(8px)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <svg width={140} height={140} style={{ zIndex: 2 }}>
        <circle
          cx={70} cy={70} r={radius}
          fill="none"
          stroke="#23243a"
          strokeWidth={10}
        />
        <circle
          cx={70} cy={70} r={radius}
          fill="none"
          stroke={`url(#neongrad)`}
          strokeWidth={7}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            filter: "drop-shadow(0 0 14px #15effc)",
            transition: "stroke-dashoffset 0.09s, stroke 0.25s",
            strokeLinecap: "round"
          }}
        />
        <defs>
          <linearGradient id="neongrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#15effc" />
            <stop offset="100%" stopColor="#7857ff" />
          </linearGradient>
        </defs>
      </svg>
      <span style={{
        marginTop: "-93px",
        fontSize: 38,
        fontWeight: 700,
        color: "#15effc",
        fontFamily: "Orbitron, monospace",
        textShadow: "0 0 14px #15effc, 0 0 2px #fff",
        letterSpacing: 2,
        zIndex: 2,
        transition: "color 0.25s"
      }}>
        {progress}<span style={{ fontSize: 18, color: "#cbe7fd", opacity: .95 }}>%</span>
      </span>
      <div style={{ display: "flex", gap: 6, marginTop: 42 }}>
        {[...Array(8)].map((_, i) =>
          <span
            key={i}
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: i*14 < progress ? "#15effc" : "#23243a",
              boxShadow: i*14 < progress ? "0 0 6px #15effc" : undefined,
              transition: "background 0.17s"
            }}
          />
        )}
      </div>
      <span style={{
        color: "#81aaff",
        marginTop: 24,
        fontFamily: "Orbitron, monospace",
        fontSize: 17,
        letterSpacing: 2,
        textShadow: "0 0 5px #164dff",
        opacity: ".87"
      }}>Preparing your tech experience…</span>
    </div>
  );
};

export default TechLoader;
