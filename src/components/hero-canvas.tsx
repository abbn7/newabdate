"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import type * as THREE from "three";

function GlassTorus() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.22;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.4} floatIntensity={1.1}>
      <mesh ref={ref} scale={1.15}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={1.4}
          chromaticAberration={0.18}
          anisotropy={0.6}
          distortion={0.4}
          distortionScale={0.4}
          temporalDistortion={0.2}
          roughness={0.05}
          ior={1.3}
          color="#a89cff"
        />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 4.5], fov: 38 }}
    >
      <color attach="background" args={["#00000000"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#7d6cff" />
      <directionalLight position={[-4, -2, 3]} intensity={0.8} color="#5fc8e8" />
      <GlassTorus />
      <Environment preset="city" />
    </Canvas>
  );
}
