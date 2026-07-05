"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Icosahedron,
  MeshDistortMaterial,
  AdaptiveDpr,
} from "@react-three/drei";
import * as THREE from "three";
import { businessUnits } from "@/lib/content";

/* Read the global scroll progress written by SmoothScroll (0..1). */
function useScrollProgress() {
  const ref = useRef(0);
  useFrame(() => {
    const g = window as unknown as { __lenisProgress?: number };
    if (typeof g.__lenisProgress === "number") ref.current = g.__lenisProgress;
    else
      ref.current =
        window.scrollY /
        Math.max(1, document.body.scrollHeight - window.innerHeight);
  });
  return ref;
}

function Starfield({ count = 900 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 9 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (points.current) points.current.rotation.y += dt * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#93D4FF"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function Node({
  radius,
  speed,
  offset,
  y,
  color,
}: {
  radius: number;
  speed: number;
  offset: number;
  y: number;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (ref.current) {
      ref.current.position.set(
        Math.cos(t) * radius,
        y + Math.sin(t * 1.3) * 0.35,
        Math.sin(t) * radius
      );
      const target = hovered ? 1.7 : 1;
      ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
    }
  });

  return (
    <group
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
    >
      <mesh>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2.4 : 1.1}
          roughness={0.25}
          metalness={0.4}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.28, 20, 20]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.28 : 0.12}
        />
      </mesh>
    </group>
  );
}

// Scale + offset for the orbital system: half size, shifted to the center-right.
const SYSTEM_SCALE = 0.5;
const SYSTEM_OFFSET: [number, number, number] = [2.55, 0, 0];

function CoreSystem() {
  const group = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Mesh>(null!);
  const progress = useScrollProgress();
  const { pointer } = useThree();

  useFrame((state, dt) => {
    if (group.current) {
      // mouse parallax + scroll-driven tilt (the "3D scrolling")
      group.current.rotation.y +=
        dt * 0.15 + (pointer.x * 0.4 - group.current.rotation.y) * 0.02;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * -0.3 + progress.current * 1.2,
        0.05
      );
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
    if (inner.current) inner.current.rotation.x += dt * 0.25;
  });

  const rings = useMemo(() => {
    // distribute 9 nodes across 3 orbital rings
    return businessUnits.map((u, i) => {
      const ring = i % 3;
      return {
        color: u.accent,
        radius: 2.4 + ring * 0.9,
        y: (ring - 1) * 0.7,
        speed: 0.3 - ring * 0.06,
        offset: (i / businessUnits.length) * Math.PI * 2,
      };
    });
  }, []);

  return (
    <group position={SYSTEM_OFFSET} scale={SYSTEM_SCALE}>
    <group ref={group}>
      {/* faceted distorting core */}
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <Icosahedron args={[1.35, 3]}>
          <MeshDistortMaterial
            color="#CC7B1D"
            emissive="#7a3f08"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.7}
            distort={0.35}
            speed={1.6}
          />
        </Icosahedron>
        {/* wireframe shell */}
        <Icosahedron args={[1.55, 1]} ref={inner}>
          <meshBasicMaterial color="#93D4FF" wireframe transparent opacity={0.12} />
        </Icosahedron>
      </Float>

      {/* orbit guide rings */}
      {[2.4, 3.3, 4.2].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, (i - 1) * 0.7, 0]}>
          <torusGeometry args={[r, 0.006, 12, 120]} />
          <meshBasicMaterial color="#1E1E33" transparent opacity={0.9} />
        </mesh>
      ))}

      {rings.map((n, i) => (
        <Node key={i} {...n} />
      ))}
    </group>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.5, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <AdaptiveDpr pixelated={false} />
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={120} color="#ffd9a0" />
      <pointLight position={[-8, -4, -6]} intensity={80} color="#229BF1" />
      <Starfield />
      <CoreSystem />
      <fog attach="fog" args={["#040410", 9, 22]} />
    </Canvas>
  );
}
