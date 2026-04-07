---
name: remotion-studio
description: >
  Scaffold a full Remotion video animation project with all ground-breaking effects packages
  (3D via Three.js, cinematic transitions, motion blur, Perlin noise, SVG shapes & paths,
  Lottie, Rive, GIF, captions, Google Fonts) and start the studio preview server.
  Use this skill whenever the user wants to create a Remotion project, make programmatic videos,
  build video animations with React, scaffold a video creation tool, or mentions "remotion",
  "video animation", "programmatic video", "react video", or "animate with code".
  Also trigger when users want to add motion graphics, kinetic typography, animated explainers,
  or any React-based video rendering pipeline — even if they don't say "Remotion" by name.
---

# Remotion Studio — Full-Stack Video Animation Scaffold

This skill creates a production-ready Remotion project with every major effects package installed,
example compositions demonstrating each one, and the Remotion Studio dev server running for
instant preview.

## Why this matters

Remotion lets you create videos programmatically with React. Instead of timeline editors, you
write components — which means version control, reusable templates, dynamic data-driven videos,
and CI/CD rendering pipelines. The ecosystem has grown to include 3D rendering, professional
transitions, motion blur, procedural noise, SVG animation, Lottie/Rive integration, and
AI-powered captioning.

## Step 1: Scaffold the project

Create a new Remotion project using the official CLI. Run this in the user's chosen directory:

```bash
npx create-video@latest --template hello-world
```

When prompted for a project name, use whatever the user wants (default: `my-video`).
After scaffolding, `cd` into the project directory.

## Step 2: Install the full effects ecosystem

Install all packages in a single command. These are the confirmed Remotion v4.x packages:

```bash
npm install @remotion/three three @types/three \
  @remotion/transitions \
  @remotion/animation-utils \
  @remotion/motion-blur \
  @remotion/noise \
  @remotion/shapes \
  @remotion/paths \
  @remotion/lottie lottie-web \
  @remotion/rive @rive-app/canvas \
  @remotion/gif \
  @remotion/media-utils \
  @remotion/captions \
  @remotion/google-fonts \
  @remotion/zod-types \
  @remotion/renderer \n  @remotion/layout-utils \n  @remotion/install-whisper-cpp \n  @remotion/openai-whisper
```

**Important notes:**
- `@remotion/lottie` requires `lottie-web` as a peer dependency
- `@remotion/three` requires `three` and `@types/three`
- `@remotion/rive` requires `@rive-app/canvas`
- All `@remotion/*` packages should be pinned to the same exact version (remove `^` caret)
- Skip `@remotion/skia` unless in a React Native project (requires React Native Skia)

## Step 3: Create example compositions

Create these files in the `src/` directory to demonstrate the key packages. Register all
compositions in the root `Root.tsx` file.

### 3a: 3D Scene — `src/ThreeScene.tsx`

Uses `@remotion/three` to render a spinning 3D object:

```tsx
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React, { useRef } from "react";
import * as THREE from "three";

const RotatingBox: React.FC = () => {
  const frame = useCurrentFrame();
  const meshRef = useRef<THREE.Mesh>(null);
  const rotation = interpolate(frame, [0, 150], [0, Math.PI * 2]);

  return (
    <mesh ref={meshRef} rotation={[rotation * 0.5, rotation, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4f46e5" metalness={0.6} roughness={0.2} />
    </mesh>
  );
};

export const ThreeScene: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <ThreeCanvas
      orthographic={false}
      width={width}
      height={height}
      style={{ backgroundColor: "#0f0f23" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <RotatingBox />
    </ThreeCanvas>
  );
};
```

**Key concepts:**
- `ThreeCanvas` is the bridge between Remotion and React Three Fiber
- `useCurrentFrame()` drives animations deterministically (no requestAnimationFrame)
- `interpolate()` maps frame numbers to animation values

### 3b: Motion Blur Text — `src/MotionBlurText.tsx`

Uses `@remotion/motion-blur` with spring physics:

```tsx
import { CameraMotionBlur } from "@remotion/motion-blur";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

export const MotionBlurText: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const translateY = spring({ frame, fps, from: 300, to: 0, config: { damping: 12 } });
  const opacity = spring({ frame, fps, from: 0, to: 1 });

  return (
    <CameraMotionBlur samples={10} shutterAngle={180}>
      <AbsoluteFill style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        height: "100%", backgroundColor: "#0f0f23",
      }}>
        <h1 style={{
          fontSize: 100, color: "white", fontFamily: "sans-serif",
          transform: `translateY(${translateY}px)`, opacity,
        }}>
          Hello Motion
        </h1>
      </AbsoluteFill>
    </CameraMotionBlur>
  );
};
```

**Key concepts:**
- `CameraMotionBlur` wraps any component to add realistic motion blur
- `samples` controls quality (more = smoother but slower preview)
- `shutterAngle` mimics camera shutter (180 = standard cinema, 360 = maximum blur)

### 3c: Transitions Demo — `src/TransitionsDemo.tsx`

Uses `@remotion/transitions` for professional scene transitions:

```tsx
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

const Slide: React.FC<{ color: string; text: string }> = ({ color, text }) => (
  <div style={{
    display: "flex", justifyContent: "center", alignItems: "center",
    height: "100%", backgroundColor: color,
  }}>
    <h1 style={{ fontSize: 80, color: "white" }}>{text}</h1>
  </div>
);

export const TransitionsDemo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={60}>
        <Slide color="#e11d48" text="Fade In" />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />

      <TransitionSeries.Sequence durationInFrames={60}>
        <Slide color="#2563eb" text="Slide Over" />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: 30 })}
      />

      <TransitionSeries.Sequence durationInFrames={60}>
        <Slide color="#16a34a" text="Wipe Away" />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={linearTiming({ durationInFrames: 30 })}
      />

      <TransitionSeries.Sequence durationInFrames={60}>
        <Slide color="#9333ea" text="The End" />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
```

**Key concepts:**
- `TransitionSeries` replaces `<Series>` when you need transitions between scenes
- Built-in presentations: `fade()`, `slide()`, `wipe()`, `flip()`, `clockWipe()`, `iris()`
- Timing: `linearTiming()` or `springTiming()` for physics-based transitions

### 3d: Noise Particles — `src/NoiseParticles.tsx`

Uses `@remotion/noise` and `@remotion/shapes` for organic procedural animation:

```tsx
import { noise2D } from "@remotion/noise";
import { Circle } from "@remotion/shapes";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const NoiseParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const particles = Array.from({ length: 50 }, (_, i) => {
    const baseX = (i % 10) * (width / 10) + width / 20;
    const baseY = Math.floor(i / 10) * (height / 5) + height / 10;
    const time = frame / 30;
    const offsetX = noise2D("x" + i, time, 0) * 60;
    const offsetY = noise2D("y" + i, time, 0) * 60;
    const scale = interpolate(noise2D("s" + i, time, 0), [-1, 1], [0.5, 1.5]);
    const hue = interpolate(noise2D("h" + i, time, 0), [-1, 1], [200, 300]);

    return { x: baseX + offsetX, y: baseY + offsetY, scale, hue };
  });

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#0f0f23", position: "relative" }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: p.x - 15, top: p.y - 15,
          transform: `scale(${p.scale})`,
        }}>
          <Circle radius={15} fill={`hsl(${p.hue}, 80%, 60%)`} />
        </div>
      ))}
    </div>
  );
};
```

**Key concepts:**
- `noise2D(seed, x, y)` returns values from -1 to 1 — use unique seeds per dimension
- Perlin noise creates smooth, organic-looking motion (unlike random jitter)
- Combine noise with `interpolate()` to map to any range (colors, sizes, positions)

### 3e: Register all compositions in `Root.tsx`

Update the project's `Root.tsx` to register all example compositions:

```tsx
import { Composition } from "remotion";
import { ThreeScene } from "./ThreeScene";
import { MotionBlurText } from "./MotionBlurText";
import { TransitionsDemo } from "./TransitionsDemo";
import { NoiseParticles } from "./NoiseParticles";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ThreeScene"
        component={ThreeScene}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MotionBlurText"
        component={MotionBlurText}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TransitionsDemo"
        component={TransitionsDemo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="NoiseParticles"
        component={NoiseParticles}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

## Step 4: Create a REMOTION_GUIDE.md

Write a guide file in the project root. Refer to `references/remotion-packages.md` for the
complete package reference to include in the guide.

## Step 5: Start the studio

```bash
npx remotion studio
```

This opens the Remotion Studio at `http://localhost:3000` where the user can:
- Preview all compositions in real time
- Scrub through the timeline frame by frame
- Adjust props via the Props Editor
- Render to MP4, WebM, or GIF directly from the UI

Tell the user the studio is running and they can browse their compositions.

## Package Quick Reference

For full details on each package, read `references/remotion-packages.md`. Here's the summary:

| Package | What it does | Key exports |
|---|---|---|
| `@remotion/three` | React Three Fiber 3D in Remotion | `ThreeCanvas` |
| `@remotion/transitions` | Professional scene transitions | `TransitionSeries`, `fade`, `slide`, `wipe`, `flip`, `clockWipe`, `iris` |
| `@remotion/animation-utils` | Transform & style interpolation helpers | `makeTransform()`, `interpolateStyles()` |
| `@remotion/motion-blur` | Cinematic motion blur effect | `<CameraMotionBlur>`, `<Trail>` |
| `@remotion/noise` | Perlin noise for organic motion | `noise2D()`, `noise3D()`, `noise4D()` |
| `@remotion/shapes` | SVG primitive shapes | `<Circle>`, `<Rect>`, `<Triangle>`, `<Star>`, `<Ellipse>`, `makeCircle()`, etc. |
| `@remotion/paths` | SVG path animations | `evolvePath()`, `getLength()`, `getPointAtLength()`, `interpolatePath()` |
| `@remotion/lottie` | Lottie animation playback | `<Lottie>`, `getLottieMetadata()` |
| `@remotion/rive` | Rive interactive animations | `<RemotionRiveCanvas>` |
| `@remotion/gif` | Display GIFs frame-synced | `<Gif>` |
| `@remotion/media-utils` | Audio/video metadata & visualization | `getAudioData()`, `getVideoMetadata()`, `visualizeAudio()` |
| `@remotion/captions` | Subtitle/caption system | `parseSrt()`, `serializeSrt()`, `createTikTokStyleCaptions()` |
| `@remotion/google-fonts` | Load Google Fonts reliably | `loadFont()` from per-font modules |
| `@remotion/zod-types` | Schema validation for composition props | `zColor()` |
| `@remotion/renderer` | Programmatic server-side rendering | `renderMedia()`, `renderFrames()`, `renderStill()` |
| `@remotion/layout-utils` | Layout measurement utilities | Layout helpers |
| `@remotion/install-whisper-cpp` | Local AI transcription | `installWhisperCpp()`, `transcribe()`, `toCaptions()` |
| `@remotion/openai-whisper` | OpenAI Whisper API integration | `openAiWhisperApiToCaptions()` |

## Common Patterns

### Spring animations
```tsx
const value = spring({ frame, fps, from: 0, to: 1, config: { damping: 12, mass: 0.5 } });
```

### Interpolation
```tsx
const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
```

### Sequences & timing
```tsx
<Series>
  <Series.Sequence durationInFrames={60}><SceneA /></Series.Sequence>
  <Series.Sequence durationInFrames={60}><SceneB /></Series.Sequence>
</Series>
```

### Loading a Google Font
```tsx
import { loadFont } from "@remotion/google-fonts/Inter";
const { fontFamily } = loadFont();
// Use fontFamily in style={{ fontFamily }}
```

### Path drawing animation
```tsx
import { evolvePath } from "@remotion/paths";
const progress = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
const evolved = evolvePath(progress, "M 0 0 L 100 100 L 200 0");
// Use evolved.strokeDasharray and evolved.strokeDashoffset on an SVG path
```

### Rendering from CLI
```bash
# Render a specific composition to MP4
npx remotion render MyComposition out/video.mp4

# Render as GIF
npx remotion render MyComposition out/animation.gif --image-format=png

# Render a still frame
npx remotion still MyComposition out/thumbnail.png --frame=30
```
