import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface KenBurnsImageProps {
  src: string;
  startScale?: number;
  endScale?: number;
  startX?: number;
  endX?: number;
  startY?: number;
  endY?: number;
  /** Frames to fade in from black at the start */
  fadeInFrames?: number;
  /** Frames to fade out to black at the end */
  fadeOutFrames?: number;
  /** Apply warm golden color grade overlay */
  warmGrade?: boolean;
}

export const KenBurnsImage: React.FC<KenBurnsImageProps> = ({
  src,
  startScale = 1.08,
  endScale = 1.0,
  startX = 0,
  endX = 0,
  startY = 0,
  endY = 0,
  fadeInFrames = 30,
  fadeOutFrames = 20,
  warmGrade = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Ken Burns: slow, deliberate movement
  const scale = interpolate(frame, [0, durationInFrames], [startScale, endScale], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateX = interpolate(frame, [0, durationInFrames], [startX, endX], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [0, durationInFrames], [startY, endY], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade in from black
  const fadeIn = interpolate(frame, [0, fadeInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out to black
  const fadeOut = interpolate(
    frame,
    [durationInFrames - fadeOutFrames, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // Subtle brightness pulse — slow breathing effect
  const brightness = interpolate(frame, [0, durationInFrames * 0.5, durationInFrames], [0.95, 1.05, 0.98], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <AbsoluteFill
        style={{
          opacity,
          overflow: "hidden",
        }}
      >
        <Img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale}) translate(${translateX}%, ${translateY}%)`,
            filter: `brightness(${brightness})`,
          }}
        />

        {/* Warm golden color grade overlay */}
        {warmGrade && (
          <AbsoluteFill
            style={{
              background: "linear-gradient(180deg, rgba(201,169,110,0.08) 0%, rgba(201,169,110,0.03) 50%, rgba(201,169,110,0.1) 100%)",
              mixBlendMode: "overlay",
            }}
          />
        )}

        {/* Cinematic vignette — dark edges focusing attention */}
        <AbsoluteFill
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
