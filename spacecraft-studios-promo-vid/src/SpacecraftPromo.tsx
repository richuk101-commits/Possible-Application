import React from "react";
import {
  AbsoluteFill,
  staticFile,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { KenBurnsImage } from "./components/KenBurnsImage";
import { TextCard } from "./components/TextCard";
import { LetterboxBars } from "./components/LetterboxBars";
import { FilmGrain } from "./components/FilmGrain";

/**
 * Spacecraft Studios — Luxury Cinematic Promotional Video
 *
 * Rolex-inspired production:
 *   - Dramatic character-by-character gold title reveal
 *   - Animated golden divider lines
 *   - Slow Ken Burns with vignette + warm golden color grading
 *   - 2-second smooth crossfades between every scene
 *   - Cinematic 2.39:1 letterboxing
 *   - Subtle 35mm film grain texture
 *   - Staggered closing card with logo, tagline, website
 *
 * Timeline: 50s @ 30fps = 1500 effective frames
 *   Opening Title: 210 frames (7s)  — dramatic reveal with breathing room
 *   8 Property Images: 165 frames each (5.5s) — lingering shots
 *   Closing Card: 330 frames (11s) — logo + title + tagline + URL
 *   9 Transitions × 75 frames = 675 frames overlap
 *   Total: 210 + 1320 + 330 - 675 = 1185 ≈ ~40s
 */

const TRANSITION_DURATION = 75; // 2.5 seconds — luxuriously slow crossfades

// Varied Ken Burns movements — alternating zoom/pan for visual rhythm
const imageScenes = [
  {
    // Neoclassical facade — dramatic slow zoom OUT revealing grandeur
    src: staticFile("image-1-closeup.jpg"),
    startScale: 1.15,
    endScale: 1.0,
    startX: 0, endX: 0,
    startY: -1, endY: 0,
  },
  {
    // Grand estate + pond — majestic slow pan RIGHT
    src: staticFile("image-2-estate.jpg"),
    startScale: 1.08,
    endScale: 1.08,
    startX: -3, endX: 3,
    startY: 0, endY: 0,
  },
  {
    // Luxury interior — intimate slow zoom IN toward light
    src: staticFile("image-3-interior.jpg"),
    startScale: 1.0,
    endScale: 1.12,
    startX: 0, endX: 1,
    startY: 0, endY: -0.5,
  },
  {
    // Classical mansion, gated driveway — grand slow zoom OUT
    src: staticFile("image-4-frontgate.jpg"),
    startScale: 1.14,
    endScale: 1.0,
    startX: 0, endX: 0,
    startY: -1, endY: 0.5,
  },
  {
    // Garden mansion rear — slow pan LEFT across water
    src: staticFile("image-5-garden.jpg"),
    startScale: 1.08,
    endScale: 1.08,
    startX: 3, endX: -3,
    startY: 0, endY: 0,
  },
  {
    // Grand arched mansion — slow zoom IN to entrance
    src: staticFile("image-6-grandarch.jpg"),
    startScale: 1.0,
    endScale: 1.14,
    startX: 0, endX: 0,
    startY: 0, endY: -0.8,
  },
  {
    // Palladian estate garden — elegant slow pan RIGHT
    src: staticFile("image-7-palladian.jpg"),
    startScale: 1.08,
    endScale: 1.08,
    startX: -2, endX: 2,
    startY: 0, endY: 0,
  },
  {
    // Classical villa rear — final slow zoom OUT reveal
    src: staticFile("image-8-villa.jpg"),
    startScale: 1.15,
    endScale: 1.0,
    startX: 0, endX: 0,
    startY: -0.5, endY: 0,
  },
];

export const SpacecraftPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <TransitionSeries>
        {/* ═══════════════════════════════════════════════════
            SCENE 1: DRAMATIC OPENING TITLE CARD
            Character-by-character gold reveal + golden line
            ═══════════════════════════════════════════════════ */}
        <TransitionSeries.Sequence durationInFrames={210}>
          <TextCard
            title="Spacecraft Studios"
            subtitle="Luxury Residential Architecture & Design"
            titleDelay={35}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* ═══════════════════════════════════════════════════
            SCENES 2–9: PROPERTY IMAGES
            Ken Burns + vignette + golden color grade
            ═══════════════════════════════════════════════════ */}
        {imageScenes.map((scene, index) => (
          <React.Fragment key={index}>
            <TransitionSeries.Sequence durationInFrames={165}>
              <KenBurnsImage
                src={scene.src}
                startScale={scene.startScale}
                endScale={scene.endScale}
                startX={scene.startX}
                endX={scene.endX}
                startY={scene.startY}
                endY={scene.endY}
                fadeInFrames={25}
                fadeOutFrames={15}
                warmGrade
              />
            </TransitionSeries.Sequence>

            <TransitionSeries.Transition
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
            />
          </React.Fragment>
        ))}

        {/* ═══════════════════════════════════════════════════
            SCENE 10: CLOSING CARD
            Logo scale-in + title + divider + tagline + URL
            Staggered dramatic reveal
            ═══════════════════════════════════════════════════ */}
        <TransitionSeries.Sequence durationInFrames={330}>
          <TextCard
            title="Spacecraft Studios"
            subtitle="Luxury Residential Architecture & Design"
            showLogo
            logoSrc={staticFile("logo.png")}
            website="spacecraftstudios.co.uk"
            titleDelay={50}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* ═══ CINEMATIC OVERLAYS (always on top) ═══════════ */}
      <LetterboxBars />
      <FilmGrain opacity={0.035} />
    </AbsoluteFill>
  );
};
