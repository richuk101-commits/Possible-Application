import { interpolate, spring, Easing } from "remotion";

/**
 * Creates a cinematic fade-in with upward drift.
 */
export function cinematicFadeIn({
  frame,
  fps,
  delay = 0,
  durationInFrames = 30,
  translateY = 40,
}: {
  frame: number;
  fps: number;
  delay?: number;
  durationInFrames?: number;
  translateY?: number;
}): { opacity: number; transform: string } {
  const adjustedFrame = frame - delay;

  const opacity = interpolate(adjustedFrame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const y = interpolate(adjustedFrame, [0, durationInFrames], [translateY, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return {
    opacity,
    transform: `translateY(${y}px)`,
  };
}

/**
 * Creates a cinematic fade-out with optional downward drift.
 */
export function cinematicFadeOut({
  frame,
  startFrame,
  durationInFrames = 20,
  translateY = -30,
}: {
  frame: number;
  startFrame: number;
  durationInFrames?: number;
  translateY?: number;
}): { opacity: number; transform: string } {
  const progress = frame - startFrame;

  const opacity = interpolate(progress, [0, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const y = interpolate(progress, [0, durationInFrames], [0, translateY], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  return {
    opacity,
    transform: `translateY(${y}px)`,
  };
}

/**
 * Creates a spring-based scale animation.
 */
export function springScale({
  frame,
  fps,
  delay = 0,
  config,
}: {
  frame: number;
  fps: number;
  delay?: number;
  config?: {
    damping?: number;
    mass?: number;
    stiffness?: number;
    overshootClamping?: boolean;
  };
}): number {
  return spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      mass: 0.5,
      stiffness: 200,
      overshootClamping: false,
      ...config,
    },
  });
}

/**
 * Creates a staggered animation delay for a list of items.
 */
export function staggerDelay(index: number, staggerFrames: number = 8): number {
  return index * staggerFrames;
}

/**
 * Creates a typewriter reveal effect by computing how many characters to show.
 */
export function typewriterProgress({
  frame,
  text,
  delay = 0,
  framesPerChar = 2,
}: {
  frame: number;
  text: string;
  delay?: number;
  framesPerChar?: number;
}): number {
  const adjustedFrame = Math.max(0, frame - delay);
  const totalChars = text.length;
  const charsToShow = Math.floor(adjustedFrame / framesPerChar);
  return Math.min(charsToShow, totalChars);
}

/**
 * Creates a horizontal wipe-reveal progress value (0 to 1).
 */
export function wipeReveal({
  frame,
  delay = 0,
  durationInFrames = 30,
}: {
  frame: number;
  delay?: number;
  durationInFrames?: number;
}): number {
  return interpolate(frame - delay, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
}

/**
 * Creates a cinematic zoom effect with slow drift.
 */
export function cinematicZoom({
  frame,
  durationInFrames,
  startScale = 1.0,
  endScale = 1.05,
}: {
  frame: number;
  durationInFrames: number;
  startScale?: number;
  endScale?: number;
}): number {
  return interpolate(frame, [0, durationInFrames], [startScale, endScale], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
}

/**
 * Pulsing glow intensity (for glowing UI elements).
 */
export function pulseGlow({
  frame,
  fps,
  frequency = 0.5,
  min = 0.4,
  max = 1.0,
}: {
  frame: number;
  fps: number;
  frequency?: number;
  min?: number;
  max?: number;
}): number {
  const t = frame / fps;
  const sine = Math.sin(2 * Math.PI * frequency * t);
  return interpolate(sine, [-1, 1], [min, max]);
}
