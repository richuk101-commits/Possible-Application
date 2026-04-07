import { CameraMotionBlur } from "@remotion/motion-blur";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

export const MotionBlurText: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const translateY = spring({ frame, fps, from: 300, to: 0, config: { damping: 12 } });
  const opacity = spring({ frame, fps, from: 0, to: 1 });

  return (
    <CameraMotionBlur samples={10} shutterAngle={180}>
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0f0f23",
        }}
      >
        <h1
          style={{
            fontSize: 100,
            color: "white",
            fontFamily: "sans-serif",
            transform: `translateY(${translateY}px)`,
            opacity,
          }}
        >
          Spacecraft Studios
        </h1>
      </AbsoluteFill>
    </CameraMotionBlur>
  );
};
