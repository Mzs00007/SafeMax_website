'use client';

import { useEffect, useRef } from 'react';

export default function NavbarLines() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        // Navbar is usually fixed height, but obstacles might push lines down.
        // We'll make the canvas tall enough to cover the dropdown/expansion area if needed,
        // or just fit the "lines" area.
        let height = 300;

        // Configuration
        const linesConfig = {
            yBase: [30, 45, 60], // Top to Bottom
            colors: [
                'rgba(0, 0, 0, 0.6)',   // Black/Dark Grey (Top)
                'rgba(255, 255, 255, 1)', // White (Middle)
                'rgba(255, 0, 0, 0.78)'    // Red (Bottom)
            ],
            speed: 0.008,
            amplitude: 3, // Reduced amplitude for straighter look
            frequency: 0.002,
        };

        let navObstacles: DOMRect[] = [];

        const updateObstacles = () => {
            // We only care about obstacles INSIDE the navbar or relevant ones
            const elements = document.querySelectorAll('[data-nav-obstacle]');
            const obstacles: DOMRect[] = [];
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                obstacles.push(rect);
            });
            navObstacles = obstacles;
        };

        const resize = () => {
            width = window.innerWidth;
            canvas.width = width;
            canvas.height = height;
            updateObstacles();
        };

        window.addEventListener('resize', resize);
        // We might want to listen to a custom event or just poll for animation changes

        let time = 0;

        const render = () => {
            time++;
            // Poll frequently for button expansions
            if (time % 2 === 0) updateObstacles();

            ctx.clearRect(0, 0, width, height);

            // Only draw on desktop
            if (width < 768) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            linesConfig.yBase.forEach((baseY, index) => {
                ctx.strokeStyle = linesConfig.colors[index];
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.shadowBlur = 0; // Performance

                // We'll build a path of points first to easily draw dots
                const points: { x: number, y: number }[] = [];

                // Draw Line
                ctx.beginPath();

                for (let x = 0; x < width; x += 4) { // Step 4 for performance
                    let y = baseY;

                    // 1. Subtle Wave
                    y += Math.sin(x * linesConfig.frequency + time * linesConfig.speed) * linesConfig.amplitude;

                    // 2. Obstacle Avoidance (Rounded Box Tracing)
                    navObstacles.forEach(rect => {
                        // Check horizontal overlap with padding
                        const padding = 20;
                        if (x > rect.left - padding && x < rect.right + padding) {

                            // Target Y is below the obstacle
                            const targetY = rect.bottom + 10 + (index * 5); // Stagger lines slightly below obstacle

                            // Smooth transition zone
                            const centerX = rect.left + rect.width / 2;
                            // Distance from center of obstacle
                            const dist = Math.abs(x - centerX);
                            const halfWidth = (rect.width / 2) + padding;

                            // "Rounded Rect" shape function? 
                            // Or just smoothstep blending to targetY

                            if (dist < halfWidth) {
                                // We are inside the zone.
                                // Calculate "influence" (0 to 1)
                                // 1 at center, 0 at edges
                                // Use a "superellipse" or sigmoid shape for tighter box following

                                // Simple Cubic Blend (Smoothstep)
                                const norm = 1 - (dist / halfWidth); // 1 at center, 0 at edge
                                const smooth = norm * norm * (3 - 2 * norm); // Smooth curve

                                // To make it "follow borders nicely", we want it to stay flat at the bottom 
                                // and curve up quickly at the sides.
                                // Let's try a "plateau" function.

                                // Rectangular influence:
                                // If we are within the 'rect.width' (inner), we want full displacement.
                                // If we are in the 'padding' zone, we transition.

                                const innerHalfWidth = rect.width / 2;
                                let displacement = 0;

                                if (dist < innerHalfWidth) {
                                    // Full displacement (Under the button)
                                    displacement = 1;
                                } else {
                                    // Transition zone (Curving up)
                                    const transitionProgress = 1 - ((dist - innerHalfWidth) / padding);
                                    // Clamp to 0-1
                                    const t = Math.max(0, Math.min(1, transitionProgress));
                                    // Smooth easing
                                    displacement = t * t * (3 - 2 * t);
                                }

                                // Apply displacement
                                const diff = targetY - y;
                                if (diff > 0) {
                                    y += diff * displacement;
                                }
                            }
                        }
                    });

                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);

                    points.push({ x, y });
                }
                ctx.stroke();

                // 3. Draw Dots "every 15cm" (approx every 400px)
                // We'll just use a modulo on screen X for simplicity, 
                // moving with time to animate.

                const dotSpacing = 400; // Pixels
                const dotOffset = (time * 1.5) % dotSpacing; // Move dots

                ctx.fillStyle = linesConfig.colors[index].replace('0.5', '1'); // Solid color
                ctx.shadowBlur = 8;
                ctx.shadowColor = ctx.fillStyle;

                // Iterate points to find positions
                // Simple approach: Iterate X by spacing
                for (let dx = dotOffset; dx < width; dx += dotSpacing) {
                    // Find closest point in our calculated path
                    // Since points are sorted by X, we can find quickly
                    // or just approximate by index since we stepped x+=4
                    const pIndex = Math.floor(dx / 4);
                    if (points[pIndex]) {
                        const p = points[pIndex];
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        // Initial setup
        resize();
        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-[300px] pointer-events-none z-[60] overflow-hidden">
            <canvas ref={canvasRef} className="block" />
        </div>
    );
}
