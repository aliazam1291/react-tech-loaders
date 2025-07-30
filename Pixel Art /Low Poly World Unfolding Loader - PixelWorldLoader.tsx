import React, { useEffect, useState } from "react";

const GRID_SIZE = 12;
const TOTAL_BLOCKS = GRID_SIZE * GRID_SIZE;

interface PixelWorldLoaderProps {
  onDone: () => void;
}

const randomColor = () => {
  const palette = ["#81e6d9","#fbbf24","#60a5fa","#f87171","#34d399","#818cf8","#f472b6"];
  return palette[Math.floor(Math.random() * palette.length)];
};

const PixelWorldLoader: React.FC<PixelWorldLoaderProps> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [blocks, setBlocks] = useState<{color:string}[]>([]);

  useEffect(() => {
    if (progress < 100) {
      const timeout = setTimeout(() => setProgress(progress + 1), 12);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(onDone, 800);
    }
  }, [progress, onDone]);

  useEffect(() => {
    const numBlocks = Math.floor((progress / 100) * TOTAL_BLOCKS);
    setBlocks(Array.from({length: numBlocks}, () => ({color: randomColor()})));
  }, [progress]);

  return (
    <div style={{
      width:"100vw", height:"100vh",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      background: "linear-gradient(135deg, #21222c 60%, #161622 100%)",
      fontFamily: "monospace",
      position: "fixed", left:0, top:0, zIndex:1000
    }}>
      <div style={{
        marginBottom: 34, letterSpacing:2, color:"#a7ffeb", fontSize:22, fontWeight:600, textShadow:"0 1px 6px #107"
      }}>
        Building Your Pixel World...
      </div>
      <div style={{
        position: "relative",
        width: 360, height: 360,
        display: "grid",
        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        background: "#171717",
        borderRadius: 18,
        boxShadow: "0 6px 40px #3338"
      }}>
        {Array.from({length: TOTAL_BLOCKS}, (_, i) => (
          <div
            key={i}
            style={{
              transition: "background 0.13s, transform 0.23s cubic-bezier(.54,2,0,.7)",
              background: blocks[i]?.color ?? "transparent",
              borderRadius: blocks[i] ? 4 : 8,
              margin: 1,
              boxShadow: blocks[i] ? "0 1px 2px #fff6,0 0 8px #0ec" : "none",
              transform: blocks[i]
                ? `scale(${0.98 + Math.sin(i + progress) * 0.03})`
                : "scale(0)",
              opacity: blocks[i] ? 1 : 0,
              transitionDelay: `${blocks[i] ? i * 2 : 0}ms`
            }}
          />
        ))}
      </div>
      <div style={{
        marginTop: 38, color: "#fff",
        fontSize: 28, fontFamily: "'Press Start 2P', monospace", letterSpacing: 2,
        textShadow: "0 0 12px #fff, 0 0 8px #0ff, 0 1px 0 #000",
        background: "rgba(36,36,51,0.61)",
        borderRadius: 6, padding: "12px 32px", border: "1.5px solid #0ff3"
      }}>
        {progress}%
      </div>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
    </div>
  );
};

export default PixelWorldLoader;
