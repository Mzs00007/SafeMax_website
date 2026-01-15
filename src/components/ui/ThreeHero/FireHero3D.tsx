'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Environment, Center, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function HeroText({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
    const groupRef = useRef<THREE.Group>(null);
    const textRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Smoothly interpolate rotation based on mouse position
        // Target rotation:
        const targetX = -mouse.current[1] * 0.3; // Tilt up/down
        const targetY = mouse.current[0] * 0.5;  // Pan left/right

        // Damping for smooth cinematic feel
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, delta * 2);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, delta * 2);

        // Constant floating motion handled by <Float> wrapper, but we add subtle drift
    });

    return (
        <group ref={groupRef}>
            <Center top>
                <Text3D
                    ref={textRef}
                    font="/fonts/Inter_Bold.json"
                    size={0.7}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    FIRE & SAFETY
                    <meshStandardMaterial
                        color="#ff3333"
                        metalness={0.6}
                        roughness={0.2}
                        emissive="#990000"
                        emissiveIntensity={0.4}
                    />
                </Text3D>
                <Text3D
                    font="/fonts/Inter_Bold.json"
                    size={0.7}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    position={[0, -1.0, 0]}
                >
                    SYSTEMS
                    <meshStandardMaterial
                        color="#ffffff"
                        metalness={0.8}
                        roughness={0.1}
                    />
                </Text3D>
            </Center>
        </group>
    );
}

// Fallback loader in case font loading takes time
function Loader() {
    return (
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold tracking-widest animate-pulse">
            LOADING 3D ENGINE...
        </div>
    );
}

export default function FireHero3D() {
    // Mouse tracking for 3D parallax
    const mouse = useRef<[number, number]>([0, 0]);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Normalize mouse position from -1 to 1
            mouse.current = [
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1,
            ];
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="w-full h-[600px] md:h-[800px] relative bg-black overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-40 blur-sm scale-110"></div>

            {/* Gradient Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black pointer-events-none"></div>

            <div className="absolute inset-0 z-10">
                <Canvas className="w-full h-full block" style={{ width: '100%', height: '100%' }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />

                    {/* Lighting Environment */}
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="red" />

                    {/* Stars for extra depth */}
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    {/* 3D Text Component */}
                    {/* 3D Text Component */}
                    <Suspense fallback={null}>
                        <HeroText mouse={mouse} />
                    </Suspense>

                    {/* Environment Reflection */}
                    <Environment preset="city" />
                </Canvas>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center gap-2 opacity-60 pointer-events-none"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent"></div>
                <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            </motion.div>
        </div>
    );
}
