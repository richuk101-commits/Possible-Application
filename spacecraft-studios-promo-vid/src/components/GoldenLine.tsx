import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Animated golden horizontal line that expands from center.
 * Used as a dramatic divider between title and subtitle.
 */
interface GoldenLineProps {
  /** Frame at which the line starts expanding */
  startFrame?: number;
  /** Width of the line as % of container */
  maxWidth?: number;
  color?: string;
}

export const GoldenLine: React.FC<GoldenLineProps> = ({
  startFrame = 0,
  maxWidth = 30,
  color = "#c9a96e",
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const width = interpolate(relativeFrame, [0, 40], [0, maxWidth], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(relativeFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px 0",
      }}
    >
      <div
        style={{
          width: `${width}%`,
          height: 1.5,
          backgroundColor: color,
          opacity,
          boxShadow: `0 0 15px ${color}40`,
        }}
      />
    </div>
  );
};
