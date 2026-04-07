import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { ThreeScene } from "./ThreeScene";
import { MotionBlurText } from "./MotionBlurText";
import { TransitionsDemo } from "./TransitionsDemo";
import { NoiseParticles } from "./NoiseParticles";
import { SpacecraftPromo } from "./SpacecraftPromo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ★ Spacecraft Studios Luxury Promo — Rolex-style cinematic video */}
      <Composition
        id="SpacecraftPromo"
        component={SpacecraftPromo}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Original demo compositions */}
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Spacecraft Studios",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
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
