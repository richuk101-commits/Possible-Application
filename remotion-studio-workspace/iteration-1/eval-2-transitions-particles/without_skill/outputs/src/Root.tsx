import React from "react";
import { Composition } from "remotion";
import { MainComposition } from "./components/MainComposition";
import { ParticleDemo } from "./components/ParticleDemo";
import { TransitionDemo } from "./components/TransitionDemo";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="MainComposition"
        component={MainComposition}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ParticleDemo"
        component={ParticleDemo}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TransitionDemo"
        component={TransitionDemo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
