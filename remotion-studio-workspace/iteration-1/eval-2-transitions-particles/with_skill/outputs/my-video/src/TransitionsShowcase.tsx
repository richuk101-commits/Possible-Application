import React from "react";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from "remotion";
import { noise2D } from "@remotion/noise";
import { Circle } from "@remotion/shapes";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

// ---------------------------------------------------------------------------
// Shared particle background used across all slides
// ---------------------------------------------------------------------------
const ParticleBg: React.FC<{ baseHue: number }> = ({ baseHue }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const count = 40;

  return (
    <AbsoluteFill>
      {Array.from({ length: count }, (_, i) => {
        const time = frame / 40;
        const cx = (i % 8) * (width / 8) + width / 16;
        const cy = Math.floor(i / 8) * (height / 5) + height / 10;
        const ox = noise2D("px" + i, time, 0.5) * 80;
        const oy = noise2D("py" + i, 0.5, time) * 80;
        const s = interpolate(noise2D("ps" + i, time, 1), [-1, 1], [0.3, 1.2]);
        const hue = baseHue + noise2D("ph" + i, time, 0) * 30;
        const alpha = interpolate(
          noise2D("pa" + i, time, 2),
          [-1, 1],
          [0.15, 0.5]
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx + ox - 12,
              top: cy + oy - 12,
              transform: `scale(${s})`,
              opacity: alpha,
              filter: "blur(2px)",
            }}
          >
            <Circle
              radius={12}
              fill={`hsl(${hue}, 75%, 65%)`}
            />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Individual scene slides
// ---------------------------------------------------------------------------
interface SlideProps {
  bgColor: string;
  hue: number;
  title: string;
  subtitle: string;
}

const Slide: React.FC<SlideProps> = ({ bgColor, hue, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({ frame, fps, from: 40, to: 0, config: { damping: 14 } });
  const titleOpacity = spring({ frame, fps, from: 0, to: 1 });
  const subtitleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      {/* Particle layer behind text */}
      <ParticleBg baseHue={hue} />

      {/* Text overlay */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontFamily,
            fontSize: 90,
            fontWeight: 700,
            color: "white",
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            margin: 0,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily,
            fontSize: 36,
            color: "rgba(255,255,255,0.85)",
            opacity: subtitleOpacity,
            marginTop: 16,
          }}
        >
          {subtitle}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Main composition: five scenes connected by different transitions
// ---------------------------------------------------------------------------
export const TransitionsShowcase: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Scene 1 — Intro */}
      <TransitionSeries.Sequence durationInFrames={75}>
        <Slide
          bgColor="#0f0a1e"
          hue={260}
          title="Welcome"
          subtitle="Smooth transitions & organic particles"
        />
      </TransitionSeries.Sequence>

      {/* Fade transition (soft crossfade) */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />

      {/* Scene 2 */}
      <TransitionSeries.Sequence durationInFrames={75}>
        <Slide
          bgColor="#0a1628"
          hue={210}
          title="Fade"
          subtitle="Classic crossfade between scenes"
        />
      </TransitionSeries.Sequence>

      {/* Slide transition (physics-based spring) */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={springTiming({ config: { damping: 15 } })}
      />

      {/* Scene 3 */}
      <TransitionSeries.Sequence durationInFrames={75}>
        <Slide
          bgColor="#1a0a28"
          hue={290}
          title="Slide"
          subtitle="Spring-physics directional slide"
        />
      </TransitionSeries.Sequence>

      {/* Wipe transition */}
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: 25 })}
      />

      {/* Scene 4 */}
      <TransitionSeries.Sequence durationInFrames={75}>
        <Slide
          bgColor="#0a2818"
          hue={150}
          title="Wipe"
          subtitle="Clean directional wipe reveal"
        />
      </TransitionSeries.Sequence>

      {/* Flip transition */}
      <TransitionSeries.Transition
        presentation={flip({ direction: "from-right" })}
        timing={springTiming({ config: { damping: 12 } })}
      />

      {/* Scene 5 */}
      <TransitionSeries.Sequence durationInFrames={75}>
        <Slide
          bgColor="#28180a"
          hue={30}
          title="Flip"
          subtitle="3D card flip with spring physics"
        />
      </TransitionSeries.Sequence>

      {/* Clock wipe transition */}
      <TransitionSeries.Transition
        presentation={clockWipe()}
        timing={linearTiming({ durationInFrames: 35 })}
      />

      {/* Scene 6 — Finale */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <Slide
          bgColor="#0f0a1e"
          hue={260}
          title="Clock Wipe"
          subtitle="Radial clock-hand reveal"
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
