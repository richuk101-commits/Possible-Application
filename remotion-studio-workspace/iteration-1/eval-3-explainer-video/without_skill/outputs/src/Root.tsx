import React from "react";
import { Composition } from "remotion";
import { ExplainerVideo } from "./ExplainerVideo";
import { VIDEO_CONFIG } from "./utils/constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ExplainerVideo"
        component={ExplainerVideo}
        durationInFrames={VIDEO_CONFIG.totalDuration}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
        defaultProps={{
          title: "How It Works",
          subtitle: "A Cinematic Explainer",
        }}
      />
      <Composition
        id="IntroScene"
        component={ExplainerVideo}
        durationInFrames={VIDEO_CONFIG.sceneDurations.intro}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
        defaultProps={{
          title: "Intro Only",
          subtitle: "Preview",
        }}
      />
    </>
  );
};
