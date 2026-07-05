"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Torus } from "@react-three/drei";
import * as THREE from "three";

function Crystal({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  useFrame((state, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.2;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.4,
      0.05
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      pointer.x * 0.3,
      0.05
    );
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh>
          <dodecahedronGeometry args={[1.5, 0]} />
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.8}
            distort={0.28}
            speed={1.4}
          />
        </mesh>
        <mesh scale={1.02}>
          <dodecahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.08} />
        </mesh>
      </Float>

      {[1.9, 2.4].map((r, i) => (
        <Torus key={i} args={[r, 0.008, 12, 100]} rotation={[Math.PI / 2 + i * 0.5, i * 0.4, 0]}>
          <meshBasicMaterial color={color} transparent opacity={0.35} />
        </Torus>
      ))}
    </group>
  );
}

export default function UnitScene({ color = "#CC7B1D" }: { color?: string }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={90} color="#ffffff" />
      <pointLight position={[-6, -3, -4]} intensity={60} color={color} />
      <Crystal color={color} />
    </Canvas>
  );
}
