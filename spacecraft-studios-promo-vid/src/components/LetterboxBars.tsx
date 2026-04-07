import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * Cinematic 2.39:1 letterbox bars overlay.
 * Renders black bars at top and bottom to create
 * a widescreen cinematic look inside a 16:9 frame.
 *
 * 1920x1080 (16:9) -> 2.39:1 visible area = 1920x803
 * Bar height = (1080 - 803) / 2 = ~138px each
 */
export const LetterboxBars: React.FC = () => {
  const barHeight = 138;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 100 }}>
      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: barHeight,
          backgroundColor: "#000000",
        }}
      />
      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: barHeight,
          backgroundColor: "#000000",
        }}
      />
    </AbsoluteFill>
  );
};
