import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/CormorantGaramond";
import { GoldenLine } from "./GoldenLine";

const { fontFamily } = loadFont();

const GOLD = "#c9a96e";
const LIGHT_GOLD = "#d4b896";
const OFF_WHITE = "#f5f0eb";

interface TextCardProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  logoSrc?: string;
  website?: string;
  /** Delay before title starts revealing (frames) */
  titleDelay?: number;
}

/**
 * Dramatic title card with:
 * - Character-by-character staggered reveal
 * - Animated golden divider line
 * - Subtitle fade-in after dramatic pause
 * - Logo with scale-in + glow (closing card)
 * - Website URL with delayed reveal
 * - Everything fades out gracefully at the end
 */
export const TextCard: React.FC<TextCardProps> = ({
  title,
  subtitle,
  showLogo = false,
  logoSrc,
  website,
  titleDelay = 20,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Title: character-by-character staggered reveal ──
  const titleChars = title.toUpperCase().split("");
  const charStagger = 2; // frames between each character
  const titleTotalReveal = titleDelay + titleChars.length * charStagger + 15;

  // ── Golden divider line starts after title is revealed ──
  const lineStartFrame = titleTotalReveal + 5;

  // ── Subtitle fades in after the line ──
  const subtitleStartFrame = lineStartFrame + 30;
  const subtitleOpacity = subtitle
    ? interpolate(frame, [subtitleStartFrame, subtitleStartFrame + 40], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  const subtitleY = subtitle
    ? interpolate(frame, [subtitleStartFrame, subtitleStartFrame + 40], [15, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // ── Logo (for closing card) ──
  const logoStartFrame = showLogo ? 30 : 0;
  const logoScale = showLogo
    ? interpolate(frame, [logoStartFrame, logoStartFrame + 50], [0.85, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;
  const logoOpacity = showLogo
    ? interpolate(frame, [logoStartFrame, logoStartFrame + 40], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // ── Website URL ──
  const websiteStartFrame = subtitleStartFrame + 50;
  const websiteOpacity = website
    ? interpolate(frame, [websiteStartFrame, websiteStartFrame + 40], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // ── Global fade out at the end ──
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 40, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
        opacity: fadeOut,
      }}
    >
      {/* Logo (closing card only) */}
      {showLogo && logoSrc && (
        <div
          style={{
            marginBottom: 40,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 0 30px ${GOLD}30)`,
          }}
        >
          <Img
            src={logoSrc}
            style={{
              height: 120,
              objectFit: "contain",
            }}
          />
        </div>
      )}

      {/* Title — character-by-character reveal */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 0,
        }}
      >
        {titleChars.map((char, i) => {
          const charFrame = titleDelay + i * charStagger;
          const charOpacity = interpolate(
            frame,
            [charFrame, charFrame + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const charY = interpolate(
            frame,
            [charFrame, charFrame + 15],
            [8, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <span
              key={i}
              style={{
                fontSize: showLogo ? 62 : 72,
                fontWeight: 300,
                color: GOLD,
                letterSpacing: "0.35em",
                opacity: charOpacity,
                transform: `translateY(${charY}px)`,
                display: "inline-block",
                minWidth: char === " " ? "0.3em" : undefined,
                textShadow: `0 0 40px ${GOLD}20`,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Golden divider line */}
      <GoldenLine startFrame={lineStartFrame} maxWidth={25} />

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            fontSize: 28,
            fontWeight: 300,
            color: LIGHT_GOLD,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            marginTop: 8,
          }}
        >
          {subtitle}
        </div>
      )}

      {/* Website URL */}
      {website && (
        <div
          style={{
            fontSize: 22,
            fontWeight: 300,
            color: OFF_WHITE,
            letterSpacing: "0.2em",
            opacity: websiteOpacity,
            marginTop: 50,
          }}
        >
          {website}
        </div>
      )}
    </AbsoluteFill>
  );
};
