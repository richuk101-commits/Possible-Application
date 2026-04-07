/**
 * Video configuration constants for the explainer video.
 */
export const VIDEO_CONFIG = {
  fps: 30,
  width: 1920,
  height: 1080,
  sceneDurations: {
    intro: 120,       // 4 seconds
    problem: 150,     // 5 seconds
    solution: 180,    // 6 seconds
    features: 210,    // 7 seconds
    callToAction: 120, // 4 seconds
  },
  get totalDuration() {
    return (
      this.sceneDurations.intro +
      this.sceneDurations.problem +
      this.sceneDurations.solution +
      this.sceneDurations.features +
      this.sceneDurations.callToAction
    );
  },
};

/**
 * Cinematic color theme.
 */
export const THEME = {
  colors: {
    background: "#0a0a0f",
    backgroundGradientStart: "#0a0a1a",
    backgroundGradientEnd: "#1a0a2e",
    primary: "#6c5ce7",
    primaryLight: "#a29bfe",
    secondary: "#00cec9",
    accent: "#fd79a8",
    white: "#ffffff",
    whiteTranslucent: "rgba(255, 255, 255, 0.85)",
    textPrimary: "#ffffff",
    textSecondary: "rgba(255, 255, 255, 0.7)",
    textMuted: "rgba(255, 255, 255, 0.4)",
    glowPurple: "rgba(108, 92, 231, 0.6)",
    glowCyan: "rgba(0, 206, 201, 0.4)",
    overlayDark: "rgba(0, 0, 0, 0.6)",
  },
  fonts: {
    heading: "Inter, system-ui, -apple-system, sans-serif",
    body: "Inter, system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  spacing: {
    sceneGap: 10, // frames of transition overlap
  },
};

/**
 * Easing presets for cinematic feel.
 */
export const EASING_PRESETS = {
  /** Smooth deceleration - good for elements entering */
  smoothOut: (t: number) => 1 - Math.pow(1 - t, 3),
  /** Smooth acceleration - good for elements leaving */
  smoothIn: (t: number) => t * t * t,
  /** Smooth both ends - good for transitions */
  smoothInOut: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  /** Elastic overshoot - good for attention-grabbing elements */
  elastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
        ? 1
        : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  /** Bounce effect */
  bounce: (t: number) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
};
