'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function GlowingLinesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Configuration
        const bgLines = {
            count: 20,
            speed: 0.00001, // Ultra slow drift
            color: 'rgba(255, 255, 255, 0.03)',
            thickness: 1
        };

        let lines: any[] = [];

        // Initialize Background Lines
        const initLines = () => {
            lines = [];
            for (let i = 0; i < bgLines.count; i++) {
                lines.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    length: Math.random() * 200 + 100,
                    angle: Math.random() * Math.PI * 2,
                    speed: bgLines.speed * (Math.random() * 0.5 + 0.5)
                });
            }
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initLines();
        };

        window.addEventListener('resize', resize);
        resize(); // Initial resize

        // Animation Loop
        const render = () => {

            // 1. Render Background Lines (Subtle Drift)
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = bgLines.color;
            ctx.lineWidth = bgLines.thickness;

            lines.forEach(line => {
                // Move
                line.x += Math.cos(line.angle) * line.speed * width; // Scale speed by width for consistency
                line.y += Math.sin(line.angle) * line.speed * height;

                // Wrap around
                if (line.x < -100) line.x = width + 100;
                if (line.x > width + 100) line.x = -100;
                if (line.y < -100) line.y = height + 100;
                if (line.y > height + 100) line.y = -100;

                ctx.beginPath();
                ctx.moveTo(line.x, line.y);
                ctx.lineTo(
                    line.x + Math.cos(line.angle) * line.length,
                    line.y + Math.sin(line.angle) * line.length
                );
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, [pathname]);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Background Canvas (Behind everything) */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-[-1]"
            />
        </div>
    );
}
