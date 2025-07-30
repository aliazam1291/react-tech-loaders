import React, { useState, useEffect } from "react";

const bootLines = [
  "Booting CityOS framework...",
  "Loading quantum pixel grid...",
  "Initializing neural blockchains...",
  "Spinning up autonomous vehicles...",
  "Deploying sensor mesh network...",
  "Connecting to AI traffic manager...",
  "Starting holographic skyline...",
  "Compiling clouds and weather...",
  "Applying neon reflections...",
  "Waking up city residents...",
  "Launching reactor core...",
  "All systems online."
];

interface HackerTerminalLoaderProps {
  onDone: () => void;
}

const HackerTerminalLoader: React.FC<HackerTerminalLoaderProps> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (progress < 100) {
      const id = setTimeout(() => {
        setProgress(p => p + 2);
        setCurrentLine(Math.min(bootLines.length - 1, Math.floor((progress / 100) * bootLines.length)));
      }, 32);
      return () => clearTimeout(id);
    } else {
      setTimeout(onDone, 700);
    }
  }, [progress, onDone]);

  return (
    <div style={{
      width: "100vw", height: "100vh",
      background: "#101410",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", zIndex: 1000, position: "fixed", left: 0, top: 0
    }}>
      <div style={{
        padding: "36px 42px", background: "rgba(10,32,20,0.94)", borderRadius: "16px",
        boxShadow: "0 10px 46px #00ffae28, 0 0 2px #344",
        fontFamily: "Menlo, Monaco, monospace", minWidth: 420
      }}>
        <div style={{ color: "#52ffaf", fontWeight: 600, fontSize: 18, marginBottom: 8, letterSpacing: 2 }}>
          &gt; Virtual Terminal
        </div>
        <div style={{ color: "#eafaff", minHeight: 204, fontSize: 18 }}>
          {bootLines.slice(0, currentLine + 1).map((l, i) => (
            <div key={i} style={{
              opacity: i === currentLine ? 1 : 0.7,
              transition: "opacity 0.15s",
              paddingLeft: 6,
              marginBottom: 2,
              whiteSpace: "pre"
            }}>
              <span style={{ color: "#30f0b0" }}>$</span> {l}
              {i === currentLine && <span style={{
                borderLeft: "2px solid #30f0b0",
                animation: "blink 1.05s step-end infinite",
                marginLeft: 5
              }}>&nbsp;</span>}
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 18,
          textAlign: "right",
          fontSize: 34,
          color: "#0ff1",
          textShadow: "0 0 8px #00ffc6",
          letterSpacing: 2,
          fontWeight: "bold"
        }}>
          {progress}%
        </div>
      </div>
      <style>{`
        @keyframes blink {
          0% { opacity: 1 }
          100% { opacity: 0 }
        }
      `}</style>
    </div>
  );
};

export default HackerTerminalLoader;
