import { useEffect } from "react";

export default function VSLBlackMegan() {
  useEffect(() => {
    const loadPlayerScript = () => {
      if (document.querySelector('script[src*="693201b82c6468ef65057c76"]')) return;
      const script = document.createElement("script");
      script.src = "https://scripts.converteai.net/cbbd1ba9-13d5-4433-b7f4-34d3fd82d956/players/693201b82c6468ef65057c76/v4/player.js";
      script.async = true;
      script.onload = () => {
        console.log("Player script loaded successfully");
      };
      script.onerror = () => {
        console.error("Failed to load player script");
      };
      document.head.appendChild(script);
    };

    loadPlayerScript();

    return () => {
      const existingScript = document.querySelector('script[src*="693201b82c6468ef65057c76"]');
      if (existingScript) {
        existingScript.remove();
      };
    };
  }, []);

  return (
    // @ts-expect-error - Player script is not defined in the global scope
    <vturb-smartplayer 
      id="vid-693201b82c6468ef65057c76" 
      style={{ 
        width: "100%",
        margin: "0 auto", 
        display: "block",
        "--player-border-radius": "20px",
        "--player-box-shadow": "0 5px 5px 0 rgba(0, 0, 0, 0.2)",
      }} 
    />
  );

};