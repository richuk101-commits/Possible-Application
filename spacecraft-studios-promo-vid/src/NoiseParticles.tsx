import { noise2D } from "@remotion/noise";
import { Circle } from "@remotion/shapes";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React from "react";

export const NoiseParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const particles = Array.from({ length: 50 }, (_, i) => {
    const baseX = (i % 10) * (width / 10) + width / 20;
    const baseY = Math.floor(i / 10) * (height / 5) + height / 10;
    const time = frame / 30;
    const offsetX = noise2D("x" + i, time, 0) * 60;
    const offsetY = noise2D("y" + i, time, 0) * 60;
    const scale = interpolate(noise2D("s" + i, time, 0), [-1, 1], [0.5, 1.5]);
    const hue = interpolate(noise2D("h" + i, time, 0), [-1, 1], [200, 300]);

    return { x: baseX + offsetX, y: baseY + offsetY, scale, hue };
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0f0f23",
        position: "relative",
      }}
    >
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x - 15,
            top: p.y - 15,
            transform: `scale(${p.scale})`,
          }}
        >
          <Circle radius={15} fill={`hsl(${p.hue}, 80%, 60%)`} />
        </div>
      ))}
    </div>
  );
};
