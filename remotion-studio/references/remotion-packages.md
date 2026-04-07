# Remotion Packages — Detailed Reference

## Table of Contents
1. [Core Remotion](#core-remotion)
2. [@remotion/three — 3D Rendering](#remotionthree)
3. [@remotion/transitions — Scene Transitions](#remotiontransitions)
4. [@remotion/animation-utils — Transform Helpers](#remotionanimation-utils)
5. [@remotion/motion-blur — Cinematic Blur](#remotionmotion-blur)
6. [@remotion/noise — Perlin Noise](#remotionnoise)
7. [@remotion/shapes — SVG Shapes](#remotionshapes)
8. [@remotion/paths — SVG Path Animations](#remotionpaths)
9. [@remotion/lottie — Lottie Animations](#remotionlottie)
10. [@remotion/rive — Rive Animations](#remotionrive)
11. [@remotion/gif — GIF Display](#remotiongif)
12. [@remotion/media-utils — Audio/Video Utilities](#remotionmedia-utils)
13. [@remotion/captions — Subtitles & Captions](#remotioncaptions)
14. [@remotion/google-fonts — Font Loading](#remotiongoogle-fonts)
15. [@remotion/zod-types — Schema Types](#remotionzod-types)
16. [@remotion/renderer — Server-Side Rendering](#remotionrenderer)

---

## Core Remotion

The `remotion` package provides the fundamental building blocks:

- `useCurrentFrame()` — current frame number (0-indexed)
- `useVideoConfig()` — returns `{ width, height, fps, durationInFrames }`
- `interpolate(value, inputRange, outputRange, options?)` — map values between ranges
- `spring({ frame, fps, from?, to?, config? })` — physics-based spring animation
- `<Composition>` — register a video composition
- `<Sequence from={frame} durationInFrames={n}>` — offset children in time
- `<Series>` — sequential composition of scenes
- `<AbsoluteFill>` — full-size absolutely positioned container
- `<Audio>`, `<Video>`, `<Img>`, `<OffthreadVideo>` — media components
- `staticFile(path)` — reference files in the `public/` folder
- `delayRender()` / `continueRender()` — handle async data loading

---

## @remotion/three

React Three Fiber integration for 3D scenes in Remotion.

**Install:** `npm install @remotion/three three @types/three`

**Key export:** `ThreeCanvas` — drop-in replacement for R3F's `<Canvas>` that works with Remotion's rendering.

```tsx
import { ThreeCanvas } from "@remotion/three";

<ThreeCanvas
  orthographic={false}  // perspective or orthographic camera
  style={{ backgroundColor: "black" }}
  camera={{ position: [0, 0, 5], fov: 75 }}
>
  {/* Standard React Three Fiber scene graph */}
  <mesh><boxGeometry /><meshStandardMaterial /></mesh>
</ThreeCanvas>
```

Use `useCurrentFrame()` inside child components to drive 3D animations deterministically.
All standard @react-three/fiber hooks work (`useFrame` for per-render logic, `useThree`, etc).

---

## @remotion/transitions

Professional transitions between scenes.

**Install:** `npm install @remotion/transitions`

**Core components:**
- `TransitionSeries` — like `<Series>` but supports transitions between sequences
- `TransitionSeries.Sequence` — a scene within the series
- `TransitionSeries.Transition` — defines the transition effect between adjacent sequences

**Built-in presentations** (import from `@remotion/transitions/<name>`):
- `fade()` — crossfade
- `slide({ direction })` — slide in/out (directions: "from-left", "from-right", "from-top", "from-bottom")
- `wipe({ direction })` — wipe reveal
- `flip({ direction })` — 3D card flip
- `clockWipe()` — clock-hand wipe

**Timing functions:**
- `linearTiming({ durationInFrames })` — constant speed
- `springTiming({ config })` — physics-based easing

---

## @remotion/animation-utils

Higher-level animation helpers.

**Install:** `npm install @remotion/animation-utils`

- `makeTransform(transforms[])` — compose CSS transforms safely
  ```tsx
  makeTransform([translate(x, y), scale(1.2), rotate(45)])
  ```
- `interpolateStyles(frame, inputRange, styleArrays)` — interpolate between CSS style objects

---

## @remotion/motion-blur

Simulates camera motion blur by rendering multiple sub-frames and compositing.

**Install:** `npm install @remotion/motion-blur`

**Components:**
- `<CameraMotionBlur samples={10} shutterAngle={180}>` — wraps any component
  - `samples`: number of sub-frames (higher = smoother, slower)
  - `shutterAngle`: 0-360 degrees (180 = standard cinema, 360 = max blur)
- `<Trail>` — leaves ghost trails of moving elements

---

## @remotion/noise

Perlin noise for procedural, organic-looking animations.

**Install:** `npm install @remotion/noise`

**Functions:**
- `noise2D(seed, x, y)` — 2D noise, returns -1 to 1
- `noise3D(seed, x, y, z)` — 3D noise
- `noise4D(seed, x, y, z, w)` — 4D noise

Use `frame / speed` as one of the coordinates to animate over time. The `seed` string
ensures different noise patterns per element.

---

## @remotion/shapes

SVG shape components and path generators.

**Install:** `npm install @remotion/shapes`

**Components** (render SVG directly):
`<Circle>`, `<Rect>`, `<Triangle>`, `<Star>`, `<Ellipse>`, `<Polygon>`, `<Heart>`

**Path generators** (return SVG path strings for use with @remotion/paths):
`makeCircle()`, `makeRect()`, `makeTriangle()`, `makeStar()`, `makeEllipse()`, `makePolygon()`, `makeHeart()`

---

## @remotion/paths

SVG path manipulation and animation utilities.

**Install:** `npm install @remotion/paths`

**Key functions:**
- `evolvePath(progress, path)` — animate drawing of a path (0 = invisible, 1 = fully drawn)
  Returns `{ strokeDasharray, strokeDashoffset }` to apply to SVG `<path>`
- `getLength(path)` — total length of SVG path
- `getPointAtLength(path, length)` — {x, y} coordinates at a given length
- `getTangentAtLength(path, length)` — tangent angle at a point
- `interpolatePath(progress, path1, path2)` — morph between two SVG paths
- `reversePath(path)` — reverse direction of path
- `normalizePath(path)` — convert relative to absolute coordinates
- `resetPath(path)` — translate path so it starts at origin

---

## @remotion/lottie

Play Lottie/Bodymovin animations synchronized to Remotion's timeline.

**Install:** `npm install @remotion/lottie lottie-web`

```tsx
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import { useEffect, useState } from "react";
import { staticFile, delayRender, continueRender } from "remotion";

// Load from public/ folder
const [handle] = useState(() => delayRender());
const [data, setData] = useState<LottieAnimationData | null>(null);

useEffect(() => {
  fetch(staticFile("animation.json"))
    .then((r) => r.json())
    .then((d) => { setData(d); continueRender(handle); });
}, [handle]);

if (!data) return null;
return <Lottie animationData={data} />;
```

Also: `getLottieMetadata(data)` to get duration info for matching composition length.

---

## @remotion/rive

Play Rive animations in Remotion.

**Install:** `npm install @remotion/rive @rive-app/canvas`

```tsx
import { RemotionRiveCanvas } from "@remotion/rive";

<RemotionRiveCanvas src={staticFile("animation.riv")} />
```

---

## @remotion/gif

Display GIF files synchronized to Remotion's frame timeline.

**Install:** `npm install @remotion/gif`

```tsx
import { Gif } from "@remotion/gif";

<Gif
  src={staticFile("animation.gif")}
  width={400}
  height={400}
  fit="cover"
  playbackRate={1}
/>
```

---

## @remotion/media-utils

Audio and video metadata and visualization.

**Install:** `npm install @remotion/media-utils`

- `getAudioData(src)` — returns audio metadata (use in useEffect with delayRender)
- `getVideoMetadata(src)` — returns video metadata (server-side)
- `visualizeAudio({ fps, frame, audioData, numberOfSamples })` — returns frequency values for audio visualizations
- `getWaveformPortion({ audioData, startTimeInSeconds, durationInSeconds })` — extract waveform segment

---

## @remotion/captions

Parse, generate, and style captions/subtitles.

**Install:** `npm install @remotion/captions`

- `parseSrt(srtContent)` — parse .srt string to Caption[]
- `serializeSrt(captions)` — convert Caption[] back to .srt format
- `createTikTokStyleCaptions({ captions, combineTokensWithinMilliseconds })` — group captions into "pages" for TikTok-style word-by-word display

---

## @remotion/google-fonts

Load Google Fonts reliably with tree-shaking.

**Install:** `npm install @remotion/google-fonts`

```tsx
import { loadFont } from "@remotion/google-fonts/Inter";
const { fontFamily } = loadFont();
// or load specific weights:
const { fontFamily } = loadFont("normal", { weights: ["400", "700"] });
```

Each font has its own import path: `@remotion/google-fonts/Roboto`, `@remotion/google-fonts/OpenSans`, etc.

---

## @remotion/zod-types

Zod schemas for validating composition input props.

**Install:** `npm install @remotion/zod-types`

- `zColor()` — validates a CSS color string (works with Remotion Studio's color picker UI)

---

## @remotion/renderer

Programmatic rendering API for server-side or CI/CD pipelines.

**Install:** `npm install @remotion/renderer`

```tsx
import { renderMedia, selectComposition } from "@remotion/renderer";
import { bundle } from "@remotion/bundler";

const bundled = await bundle({ entryPoint: "./src/index.ts" });
const composition = await selectComposition({ serveUrl: bundled, id: "MyComp" });

await renderMedia({
  composition,
  serveUrl: bundled,
  codec: "h264",
  outputLocation: "out/video.mp4",
});
```

Also: `renderFrames()`, `renderStill()`, `getCompositions()`.


---

## @remotion/install-whisper-cpp

Local AI transcription using Whisper.cpp.

**Install:** `npm install @remotion/install-whisper-cpp`

Key functions:
- `installWhisperCpp({ to, version })` - installs whisper.cpp binary
- `downloadWhisperModel({ model, folder })` - downloads a model (tiny, base, small, medium, large-v3, large-v3-turbo)
- `transcribe({ model, whisperPath, inputPath, tokenLevelTimestamps })` - transcribes audio
- `toCaptions(result)` - converts transcription to Caption objects

---

## @remotion/openai-whisper

OpenAI Whisper API integration (from v4.0.217). Server-side only.

**Install:** `npm install @remotion/openai-whisper`

Key function: `openAiWhisperApiToCaptions(apiResult)` - converts OpenAI API output to Caption[]

---

## @remotion/layout-utils

Layout measurement utilities for dynamic sizing.

**Install:** `npm install @remotion/layout-utils`

Provides helpers for measuring text and element dimensions before rendering.
