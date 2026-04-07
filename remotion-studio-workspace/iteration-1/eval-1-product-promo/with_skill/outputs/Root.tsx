import React from "react";
import { Composition } from "remotion";
import { ThreeScene } from "./ThreeScene";
import { MotionBlurText } from "./MotionBlurText";
import { TransitionsDemo } from "./TransitionsDemo";
import { NoiseParticles } from "./NoiseParticles";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 3D product showcase — spinning product with dramatic lighting */}
      <Composition
        id="ThreeScene"
        component={ThreeScene}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Motion-blurred title card for the promo headline */}
      <Composition
        id="MotionBlurText"
        component={MotionBlurText}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Cinematic transitions between product feature slides */}
      <Composition
        id="TransitionsDemo"
        component={TransitionsDemo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Ambient noise-driven particle background for overlays */}
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
