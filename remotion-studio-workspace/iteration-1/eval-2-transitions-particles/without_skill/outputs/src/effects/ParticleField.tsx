import React, { useMemo } from "react";
import { Particle, ParticleConfig } from "./Particle";

/**
 * Deterministic pseudo-random number generator (mulberry32)
 * Ensures consistent particle placement across renders.
 */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface ParticleFieldProps {
  /** Total number of particles */
  count?: number;
  /** Total duration of the field in frames */
  durationInFrames: number;
  /** Color palette for particles */
  colors?: string[];
  /** Min and max particle radius */
  radiusRange?: [number, number];
  /** Overall opacity multiplier */
  opacityRange?: [number, number];
  /** Speed range for particle motion */
  speedRange?: [number, number];
  /** Drift amplitude range */
  driftRange?: [number, number];
  /** Random seed for deterministic generation */
  seed?: number;
  /** Style variant */
  variant?: "floating" | "rising" | "swirling" | "dust";
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 60,
  durationInFrames,
  colors = [
    "rgba(255, 255, 255, 0.8)",
    "rgba(200, 220, 255, 0.6)",
    "rgba(180, 200, 255, 0.5)",
    "rgba(220, 240, 255, 0.7)",
    "rgba(160, 190, 255, 0.4)",
  ],
  radiusRange = [2, 12],
  opacityRange = [0.2, 0.7],
  speedRange = [0.3, 1.2],
  driftRange = [20, 80],
  seed = 42,
  variant = "floating",
}) => {
  const particles = useMemo(() => {
    const rng = seededRandom(seed);
    const configs: ParticleConfig[] = [];

    for (let i = 0; i < count; i++) {
      const particleDuration = Math.floor(
        durationInFrames * (0.3 + rng() * 0.5)
      );
      const startFrame = Math.floor(
        rng() * (durationInFrames - particleDuration * 0.5)
      );

      let startX = rng();
      let startY = rng();
      let driftX = driftRange[0] + rng() * (driftRange[1] - driftRange[0]);
      let driftY = driftRange[0] + rng() * (driftRange[1] - driftRange[0]);
      const speed = speedRange[0] + rng() * (speedRange[1] - speedRange[0]);

      // Apply variant-specific behavior
      switch (variant) {
        case "rising":
          startY = 0.7 + rng() * 0.3; // Start near bottom
          driftY = driftY * 2; // Stronger vertical motion
          driftX = driftX * 0.5; // Less horizontal drift
          break;
        case "swirling":
          driftX = driftX * 1.5;
          driftY = driftY * 1.5;
          break;
        case "dust":
          driftX = driftX * 0.3;
          driftY = driftY * 0.3;
          break;
        default: // floating
          break;
      }

      configs.push({
        id: i,
        startX,
        startY,
        radius:
          radiusRange[0] + rng() * (radiusRange[1] - radiusRange[0]),
        color: colors[Math.floor(rng() * colors.length)],
        opacity: [
          opacityRange[0],
          opacityRange[0] +
            rng() * (opacityRange[1] - opacityRange[0]),
        ],
        speed,
        startFrame,
        duration: particleDuration,
        driftX,
        driftY,
        phase: rng() * Math.PI * 2,
      });
    }

    return configs;
  }, [
    count,
    durationInFrames,
    colors,
    radiusRange,
    opacityRange,
    speedRange,
    driftRange,
    seed,
    variant,
  ]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((config) => (
        <Particle
          key={config.id}
          config={config}
          containerWidth={1920}
          containerHeight={1080}
        />
      ))}
    </div>
  );
};
