import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * Subtle film grain overlay using CSS noise.
 * Uses a tiny SVG turbulence filter for organic 35mm texture
 * without any per-frame DOM element creation.
 */
export const FilmGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.06 }) => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 90,
        mixBlendMode: "overlay",
        opacity,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};
