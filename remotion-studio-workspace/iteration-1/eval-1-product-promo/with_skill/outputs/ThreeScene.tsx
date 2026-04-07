import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
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
  return (
    <ThreeCanvas
      orthographic={false}
      style={{ backgroundColor: "#0f0f23" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <RotatingBox />
    </ThreeCanvas>
  );
};
