# Spacecraft Studios Promo Vid — Remotion Guide

## Quick Start

```bash
# Start the studio (live preview)
npx remotion studio

# Render a composition to MP4
npx remotion render ThreeScene out/three-scene.mp4

# Render as GIF
npx remotion render NoiseParticles out/particles.gif --image-format=png

# Render a still frame
npx remotion still MotionBlurText out/thumbnail.png --frame=30

# List all compositions
npx remotion compositions
```

## Installed Packages

### @remotion/three — 3D Rendering
React Three Fiber integration. Use `ThreeCanvas` as the canvas wrapper.
```tsx
import { ThreeCanvas } from "@remotion/three";
<ThreeCanvas width={1920} height={1080}>
  <mesh><boxGeometry /><meshStandardMaterial /></mesh>
</ThreeCanvas>
```

### @remotion/transitions — Scene Transitions
Professional transitions: fade, slide, wipe, flip, clockWipe, iris.
```tsx
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
```

### @remotion/motion-blur — Cinematic Blur
Wrap components in `<CameraMotionBlur>` for realistic motion blur.
Children MUST use `<AbsoluteFill>`.
```tsx
import { CameraMotionBlur } from "@remotion/motion-blur";
<CameraMotionBlur samples={10} shutterAngle={180}>
  <AbsoluteFill>...</AbsoluteFill>
</CameraMotionBlur>
```

### @remotion/noise — Perlin Noise
Organic, smooth procedural animation.
```tsx
import { noise2D } from "@remotion/noise";
const value = noise2D("seed", frame / 30, 0); // returns -1 to 1
```

### @remotion/shapes — SVG Shapes
Components: Circle, Rect, Triangle, Star, Ellipse, Polygon, Heart.
Generators: makeCircle(), makeRect(), etc.
```tsx
import { Circle } from "@remotion/shapes";
<Circle radius={50} fill="blue" />
```

### @remotion/paths — SVG Path Animation
Animate SVG path drawing, morphing, and traversal.
```tsx
import { evolvePath } from "@remotion/paths";
const evolved = evolvePath(progress, svgPathString);
// Apply evolved.strokeDasharray + strokeDashoffset to <path>
```

### @remotion/animation-utils — Transform Helpers
```tsx
import { makeTransform, interpolateStyles } from "@remotion/animation-utils";
```

### @remotion/lottie — Lottie Animations
Requires `lottie-web`. Load JSON from public/ with staticFile().
```tsx
import { Lottie } from "@remotion/lottie";
<Lottie animationData={data} />
```

### @remotion/rive — Rive Animations
```tsx
import { RemotionRiveCanvas } from "@remotion/rive";
<RemotionRiveCanvas src={staticFile("animation.riv")} />
```

### @remotion/gif — GIF Display
```tsx
import { Gif } from "@remotion/gif";
<Gif src={staticFile("animation.gif")} width={400} height={400} />
```

### @remotion/media-utils — Audio/Video Utilities
```tsx
import { getAudioData, visualizeAudio } from "@remotion/media-utils";
```

### @remotion/captions — Subtitles
```tsx
import { parseSrt, createTikTokStyleCaptions } from "@remotion/captions";
```

### @remotion/google-fonts — Font Loading
```tsx
import { loadFont } from "@remotion/google-fonts/Inter";
const { fontFamily } = loadFont();
```

### @remotion/zod-types — Prop Validation
```tsx
import { zColor } from "@remotion/zod-types";
// Use with Composition schema prop for Studio UI controls
```

### @remotion/renderer — Programmatic Rendering
```tsx
import { renderMedia, selectComposition } from "@remotion/renderer";
import { bundle } from "@remotion/bundler";
```

### @remotion/install-whisper-cpp — Local AI Transcription
```tsx
import { installWhisperCpp, transcribe, toCaptions } from "@remotion/install-whisper-cpp";
```

### @remotion/openai-whisper — OpenAI Whisper API
```tsx
import { openAiWhisperApiToCaptions } from "@remotion/openai-whisper";
```

## Core Patterns

### Spring Physics
```tsx
const value = spring({ frame, fps, from: 0, to: 1, config: { damping: 12, mass: 0.5 } });
```

### Interpolation
```tsx
const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
```

### Async Data Loading
```tsx
const [handle] = useState(() => delayRender());
useEffect(() => {
  fetchData().then((data) => {
    setData(data);
    continueRender(handle);
  });
}, [handle]);
```
