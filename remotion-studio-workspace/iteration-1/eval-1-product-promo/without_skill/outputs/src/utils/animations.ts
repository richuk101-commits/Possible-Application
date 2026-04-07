import { interpolate, spring, Easing } from "remotion";

/**
 * Creates a smooth fade-in animation.
 */
export const fadeIn = (frame: number, startFrame: number, durationFrames: number): number => {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
};

/**
 * Creates a smooth fade-out animation.
 */
export const fadeOut = (frame: number, startFrame: number, durationFrames: number): number => {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
};

/**
 * Creates a slide-in-from-bottom animation, returning translateY value.
 */
export const slideInFromBottom = (
  frame: number,
  startFrame: number,
  durationFrames: number,
  distance: number = 80
): number => {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });
};

/**
 * Creates a slide-in-from-left animation, returning translateX value.
 */
export const slideInFromLeft = (
  frame: number,
  startFrame: number,
  durationFrames: number,
  distance: number = 100
): number => {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [-distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
};

/**
 * Creates a scale-up (pop-in) animation using spring physics.
 */
export const scaleIn = (
  frame: number,
  fps: number,
  startFrame: number,
  config?: { damping?: number; mass?: number; stiffness?: number }
): number => {
  return spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: config?.damping ?? 12,
      mass: config?.mass ?? 0.5,
      stiffness: config?.stiffness ?? 120,
    },
  });
};

/**
 * Creates a continuous rotation value (in radians) for 3D objects.
 */
export const continuousRotation = (
  frame: number,
  speed: number = 0.02
): number => {
  return frame * speed;
};

/**
 * Creates a smooth oscillation (e.g., floating/bobbing effect).
 */
export const oscillate = (
  frame: number,
  amplitude: number = 0.2,
  frequency: number = 0.05
): number => {
  return Math.sin(frame * frequency) * amplitude;
};

/**
 * Creates a staggered delay for sequential element animations.
 */
export const staggerDelay = (index: number, delayPerItem: number = 8): number => {
  return index * delayPerItem;
};
