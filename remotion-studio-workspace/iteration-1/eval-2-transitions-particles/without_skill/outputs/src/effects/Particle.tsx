import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export interface ParticleConfig {
  /** Unique identifier for this particle */
  id: number;
  /** Starting X position (0-1 normalized) */
  startX: number;
  /** Starting Y position (0-1 normalized) */
  startY: number;
  /** Particle radius in pixels */
  radius: number;
  /** Color of the particle */
  color: string;
  /** Opacity range [min, max] */
  opacity: [number, number];
  /** Speed multiplier for drift */
  speed: number;
  /** Frame at which this particle appears */
  startFrame: number;
  /** Duration in frames this particle lives */
  duration: number;
  /** Horizontal drift amplitude */
  driftX: number;
  /** Vertical drift amplitude */
  driftY: number;
  /** Phase offset for sine-based motion */
  phase: number;
}

interface ParticleProps {
  config: ParticleConfig;
  containerWidth: number;
  containerHeight: number;
}

export const Particle: React.FC<ParticleProps> = ({
  config,
  containerWidth,
  containerHeight,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - config.startFrame;

  if (localFrame < 0 || localFrame > config.duration) {
    return null;
  }

  const progress = localFrame / config.duration;

  // Organic floating motion using sine waves with phase offsets
  const xOffset =
    Math.sin(progress * Math.PI * 2 * config.speed + config.phase) *
    config.driftX;
  const yOffset =
    Math.cos(progress * Math.PI * 1.5 * config.speed + config.phase * 0.7) *
    config.driftY;

  // Gentle upward drift
  const yDrift = -progress * 80 * config.speed;

  const x = config.startX * containerWidth + xOffset;
  const y = config.startY * containerHeight + yOffset + yDrift;

  // Fade in and out
  const opacity = interpolate(
    localFrame,
    [0, config.duration * 0.15, config.duration * 0.7, config.duration],
    [0, config.opacity[1], config.opacity[1], 0],
    {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Subtle scale pulsing
  const scale =
    1 + Math.sin(progress * Math.PI * 4 + config.phase) * 0.15;

  // Subtle blur for depth
  const blur = config.radius < 4 ? 1 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x - config.radius,
        top: y - config.radius,
        width: config.radius * 2,
        height: config.radius * 2,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${config.color}, transparent 70%)`,
        opacity,
        transform: `scale(${scale})`,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        pointerEvents: "none",
      }}
    />
  );
};
