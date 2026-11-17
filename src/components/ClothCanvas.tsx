'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { Vector2 } from 'three';
import { FS, VS } from '@/lib/clothShaders';

function Cloth({ animate, segs }: { animate: boolean; segs: [number, number] }) {
  const uniforms = useMemo(() => ({ uT: { value: 3 }, uS: { value: 0 }, uM: { value: new Vector2(1.5, 0.4) } }), []);
  useFrame((state, dt) => {
    if (!animate) return;
    uniforms.uT.value += dt;
    const tx = (state.pointer.x * state.viewport.width) / 2;
    const ty = (state.pointer.y * state.viewport.height) / 2;
    uniforms.uM.value.x += (tx - uniforms.uM.value.x) * 0.06;
    uniforms.uM.value.y += (ty - uniforms.uM.value.y) * 0.06;
    uniforms.uS.value = Math.min(1, window.scrollY / window.innerHeight);
  });
  return (
    <mesh>
      <planeGeometry args={[10, 6, segs[0], segs[1]]} />
      <shaderMaterial uniforms={uniforms} vertexShader={VS} fragmentShader={FS} />
    </mesh>
  );
}

/** Real-time fabric study. animate=false renders a single still frame (reduced motion). */
export default function ClothCanvas({ animate, eventSource }: { animate: boolean; eventSource: RefObject<HTMLElement | null> }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const small = window.innerWidth < 760 || (navigator.hardwareConcurrency || 8) <= 4;

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 35 }}
        dpr={[1, small ? 1.5 : 2]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        frameloop={animate && visible ? 'always' : 'demand'}
        eventSource={eventSource as RefObject<HTMLElement>}
        eventPrefix="client"
      >
        <Cloth animate={animate} segs={small ? [70, 40] : [150, 84]} />
      </Canvas>
    </div>
  );
}
