import React from "react";
import { CameraMotionBlur } from "@remotion/motion-blur";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { makeTransform } from "@remotion/animation-utils";
import { noise2D } from "@remotion/noise";

const { fontFamily } = loadFont("normal", { weights: ["700", "900"] });

/**
 * CinematicTitle
 *
 * A full-screen title card with heavy motion blur, spring-driven entrance,
 * subtle noise-based camera shake, and a cinematic letterbox overlay.
 * Designed to open an explainer video with impact.
 */
export const CinematicTitle: React.FC<{
  title?: string;
  subtitle?: string;
}> = ({ title = "The Future of AI", subtitle = "An Animated Explainer" }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // --- Title entrance: spring from below with overshoot ---
  const titleY = spring({
    frame,
    fps,
    from: 250,
    to: 0,
    config: { damping: 10, mass: 0.8, stiffness: 80 },
  });

  const titleOpacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 20 },
  });

  const titleScale = spring({
    frame,
    fps,
    from: 0.6,
    to: 1,
    config: { damping: 12, mass: 0.5 },
  });

  // --- Subtitle entrance: delayed, slides in from right ---
  const subtitleDelay = 15;
  const subtitleX = spring({
    frame: Math.max(0, frame - subtitleDelay),
    fps,
    from: 200,
    to: 0,
    config: { damping: 14 },
  });

  const subtitleOpacity = spring({
    frame: Math.max(0, frame - subtitleDelay),
    fps,
    from: 0,
    to: 1,
  });

  // --- Subtle camera shake via Perlin noise ---
  const shakeIntensity = interpolate(frame, [0, 20, 60], [0, 4, 1], {
    extrapolateRight: "clamp",
  });
  const shakeX = noise2D("shakeX", frame / 8, 0) * shakeIntensity;
  const shakeY = noise2D("shakeY", 0, frame / 8) * shakeIntensity;

  // --- Cinematic vignette gradient ---
  const vignetteOpacity = interpolate(frame, [0, 30], [0, 0.7], {
    extrapolateRight: "clamp",
  });

  // --- Background glow pulse ---
  const glowRadius = interpolate(
    noise2D("glow", frame / 40, 0),
    [-1, 1],
    [300, 500]
  );

  // --- Letterbox bars ---
  const barHeight = height * 0.08;

  return (
    <CameraMotionBlur samples={12} shutterAngle={200}>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a1a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          transform: `translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        {/* Background radial glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: glowRadius * 2,
            height: glowRadius * 2,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,70,229,0.3) 0%, rgba(10,10,26,0) 70%)",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />

        {/* Title text */}
        <h1
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 110,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: 8,
            margin: 0,
            opacity: titleOpacity,
            transform: makeTransform([
              { type: "translateY", value: `${titleY}px` },
              { type: "scale", value: titleScale },
            ]),
            textShadow: "0 0 60px rgba(79,70,229,0.6), 0 4px 20px rgba(0,0,0,0.8)",
            zIndex: 2,
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 36,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: 4,
            margin: 0,
            marginTop: 20,
            opacity: subtitleOpacity,
            transform: `translateX(${subtitleX}px)`,
            zIndex: 2,
          }}
        >
          {subtitle}
        </p>

        {/* Decorative underline that draws in */}
        <div
          style={{
            marginTop: 24,
            height: 3,
            backgroundColor: "#4f46e5",
            width: interpolate(frame, [20, 50], [0, 400], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            borderRadius: 2,
            boxShadow: "0 0 20px rgba(79,70,229,0.8)",
            zIndex: 2,
          }}
        />

        {/* Vignette overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
            opacity: vignetteOpacity,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        {/* Cinematic letterbox bars */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: barHeight,
            backgroundColor: "#000",
            zIndex: 4,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: barHeight,
            backgroundColor: "#000",
            zIndex: 4,
          }}
        />
      </div>
    </CameraMotionBlur>
  );
};
