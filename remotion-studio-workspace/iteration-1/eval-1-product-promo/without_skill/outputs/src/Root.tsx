import React from "react";
import { Composition } from "remotion";
import { ProductPromo } from "./components/ProductPromo";
import { ProductPromoThumbnail } from "./components/ProductPromoThumbnail";
import {
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
  VIDEO_FPS,
  DURATION_IN_FRAMES,
} from "./utils/constants";
import { productPromoSchema } from "./utils/schema";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProductPromo"
        component={ProductPromo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={productPromoSchema}
        defaultProps={{
          productName: "ProMax Ultra",
          tagline: "Experience the Future",
          features: [
            "Lightning Fast Performance",
            "Premium Build Quality",
            "AI-Powered Intelligence",
          ],
          primaryColor: "#6C63FF",
          secondaryColor: "#FF6584",
          backgroundColor: "#0a0a1a",
          ctaText: "Order Now",
        }}
      />
      <Composition
        id="ProductPromoThumbnail"
        component={ProductPromoThumbnail}
        durationInFrames={1}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          productName: "ProMax Ultra",
          tagline: "Experience the Future",
          primaryColor: "#6C63FF",
          backgroundColor: "#0a0a1a",
        }}
      />
    </>
  );
};
