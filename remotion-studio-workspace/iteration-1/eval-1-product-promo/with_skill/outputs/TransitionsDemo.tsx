import React from "react";
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
