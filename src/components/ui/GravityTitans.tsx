// ... imports ...
import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

// ... CLIENTS array ... (Keep as is)
const CLIENTS = [
    { name: 'EMAAR', logo: '/assets/images/logo-white.png' },
    { name: 'RTA', logo: '/assets/images/logo-white.png' },
    { name: 'DEWA', logo: '/assets/images/logo-white.png' },
    { name: 'NAKHEEL', logo: '/assets/images/logo-white.png' },
    { name: 'WASL', logo: '/assets/images/logo-white.png' },
    { name: 'MERAAS', logo: '/assets/images/logo-white.png' },
    { name: 'DAMAC', logo: '/assets/images/logo-white.png' },
    { name: 'DP WORLD', logo: '/assets/images/logo-white.png' },
    { name: 'DUBAI AIRPORTS', logo: '/assets/images/logo-white.png' },
    { name: 'JUMEIRAH', logo: '/assets/images/logo-white.png' },
    { name: 'TECOM', logo: '/assets/images/logo-white.png' },
    { name: 'SILICON OASIS', logo: '/assets/images/logo-white.png' },
];

export default function GravityTitans() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);

    // Snake Mode State
    const isSnakeModeRef = useRef(true);
    const timeRef = useRef(0);

    // Tracking Radius for Responsiveness
    const [visualRadius, setVisualRadius] = useState(40);
    const radiusRef = useRef(40);

    const titanRefs = useRef<(HTMLDivElement | null)[]>([]);
    const mouseDownPos = useRef<{ x: number, y: number } | null>(null);

    // Smart Sizing Algorithm (Keep as is)
    const calculateSmartRadius = (width: number, height: number, count: number) => {
        if (!width || !height || width < 100 || height < 200) return 30;
        const densityFactor = 0.35;
        const totalArea = width * height;
        const targetAreaPerCircle = (totalArea * densityFactor) / count;
        if (targetAreaPerCircle <= 0 || isNaN(targetAreaPerCircle)) return 30;
        let r = Math.sqrt(targetAreaPerCircle / Math.PI);
        const MIN_R = 30;
        const headerGap = 100;
        const availableH = height - headerGap;
        const heightConstraint = (availableH / 2.2);
        const MAX_R = Math.min(120, heightConstraint);
        return Math.min(Math.max(r, MIN_R), MAX_R);
    };

    useEffect(() => {
        if (!sceneRef.current) return;

        const Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Runner = Matter.Runner,
            Body = Matter.Body,
            Events = Matter.Events,
            Vector = Matter.Vector,
            Sleeping = Matter.Sleeping;

        const engine = Engine.create({
            positionIterations: 20,
            velocityIterations: 20,
            gravity: { x: 0, y: 0 } // Start with 0 gravity for Snake Mode
        });
        const world = engine.world;
        engineRef.current = engine;

        const width = sceneRef.current.clientWidth || window.innerWidth;
        const height = sceneRef.current.clientHeight || 500;

        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                background: 'transparent',
                wireframes: false,
                pixelRatio: 1
            }
        });

        // Ensure touch actions allow scrolling, Canvas shouldn't block scroll unless interacting
        render.canvas.style.touchAction = 'pan-y';
        renderRef.current = render;

        // Boundaries
        const wallThickness = 2000;
        const headerGap = 100;
        const wallOptions = { isStatic: true, render: { visible: false }, friction: 1, restitution: 0.2, density: 1000 };
        const ground = Bodies.rectangle(width / 2, height + (wallThickness / 2), width + 200, wallThickness, wallOptions);
        const leftWall = Bodies.rectangle(0 - (wallThickness / 2), height / 2, wallThickness, height * 4, wallOptions);
        const rightWall = Bodies.rectangle(width + (wallThickness / 2), height / 2, wallThickness, height * 4, wallOptions);
        const ceiling = Bodies.rectangle(width / 2, headerGap - (wallThickness / 2), width * 4, wallThickness, wallOptions);
        World.add(world, [ground, leftWall, rightWall, ceiling]);

        // Initial Sizing
        const initialRadius = calculateSmartRadius(width, height, CLIENTS.length);
        radiusRef.current = initialRadius;
        setVisualRadius(initialRadius);

        // Create Bodies
        const physicsRadius = initialRadius + 2;
        const titans = CLIENTS.map((client, i) => {
            // Initial spawn doesn't matter much as Snake Mode takes over immediately
            // But we keep it safe
            return Bodies.circle(width / 2, height / 2, physicsRadius, {
                label: `titan-${i}`,
                restitution: 0.4,
                friction: 0.5,
                frictionAir: 0.02,
                density: 1.0,
                render: { visible: false }
            });
        });

        World.add(world, titans);

        // Core Update Loop
        Events.on(engine, 'beforeUpdate', () => {
            // SNAKE MODE ANIMATION
            if (isSnakeModeRef.current) {
                timeRef.current += 0.015; // Consistent Speed
                const t = timeRef.current;

                const centerX = render.options.width! / 2;
                const centerY = render.options.height! / 2;

                // Circular Orbit Radius (Standardized)
                // "Linear circular clockwise" - Push to edges
                const orbitRadius = Math.min(render.options.width!, render.options.height!) * 0.45;

                titans.forEach((body, i) => {
                    // Train Pattern: Follow each other
                    const spacing = 0.5; // Distance between cars
                    const angle = t - (i * spacing);

                    // Clockwise: cos(angle), sin(angle)
                    const x = centerX + Math.cos(angle) * orbitRadius;
                    const y = centerY + Math.sin(angle) * orbitRadius;

                    Body.setPosition(body, { x, y });
                    Body.setVelocity(body, { x: 0, y: 0 });
                    Body.setAngularVelocity(body, 0);
                });
            }
        });

        Events.on(engine, 'afterUpdate', () => {
            const r = radiusRef.current;
            titans.forEach((body, i) => {
                const domNode = titanRefs.current[i];
                if (domNode) {
                    const { x, y } = body.position;
                    // domNode.style.transform = `translate(${x - r}px, ${y - r}px) rotate(${body.angle}rad)`;
                    // Optimize DOM updates
                    domNode.style.transform = `translate3d(${x - r}px, ${y - r}px, 0) rotate(${body.angle}rad)`;
                }
            });
        });

        // Interaction
        const mouse = Mouse.create(render.canvas);

        // CRITICAL SCROLL FIX: Remove Matter.js default listeners to allow page scrolling
        const matterEvents = ['mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchmove', 'touchend', 'mousewheel', 'DOMMouseScroll'];
        matterEvents.forEach(evt => {
            render.canvas.removeEventListener(evt, (mouse as any)[evt]);
        });

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: { stiffness: 0.2, render: { visible: false } }
        });
        World.add(world, mouseConstraint);

        // Custom Pointer Handling
        const updateMousePosition = (clientX: number, clientY: number) => {
            const rect = render.canvas.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            (Matter.Mouse as any).setPosition(mouse, { x, y });
        };

        const handlePointerDown = (e: any) => {
            updateMousePosition(e.clientX, e.clientY);

            // Check visual hit test
            const bodies = Matter.Composite.allBodies(engine.world).filter(b => !b.isStatic);
            const hit = Matter.Query.point(bodies, mouse.position);

            // WAKE UP PHYSICS on any interaction
            if (isSnakeModeRef.current) {
                isSnakeModeRef.current = false;
                engine.gravity.y = 1;
                titans.forEach(b => Sleeping.set(b, false));
            }

            if (hit.length > 0) {
                // Hit a Titan -> Grab it, Block Scroll
                mouse.button = 0;
                if (e.cancelable) e.preventDefault();
                if (e.currentTarget && e.currentTarget.setPointerCapture) {
                    e.currentTarget.setPointerCapture(e.pointerId);
                }
            } else {
                // Hit Background -> Allow Scroll, Don't Grab
                mouse.button = -1;
            }
            mouseDownPos.current = { ...mouse.position };
        };

        const handlePointerMove = (e: any) => {
            updateMousePosition(e.clientX, e.clientY);
            // If grabbing, block default to prevents scroll/text selection while dragging
            if (mouse.button === 0) {
                if (e.cancelable) e.preventDefault();
            }
        };

        const handlePointerUp = (e: any) => {
            updateMousePosition(e.clientX, e.clientY);

            // Tap / Burst Logic
            if (mouseDownPos.current) {
                const dist = Vector.magnitude(Vector.sub(mouse.position, mouseDownPos.current));
                if (dist < 5) {
                    // Apply Force / Burst
                    const dynamicBodies = Matter.Composite.allBodies(engine.world).filter(b => !b.isStatic);
                    dynamicBodies.forEach(body => {
                        const forceVector = Vector.sub(body.position, mouse.position);
                        const d = Vector.magnitude(forceVector);
                        if (d < 300) {
                            const normalized = Vector.normalise(forceVector);
                            const forceMagnitude = (50 * body.mass * 0.001);
                            const force = forceMagnitude / Math.max(d * 0.01, 1);
                            Body.applyForce(body, body.position, Vector.mult(normalized, force));
                        }
                    });
                }
            }

            mouse.button = -1;
            mouseDownPos.current = null;
        };

        // Attach Custom Listeners
        render.canvas.addEventListener('pointerdown', handlePointerDown);
        render.canvas.addEventListener('pointermove', handlePointerMove);
        render.canvas.addEventListener('pointerup', handlePointerUp);
        render.canvas.addEventListener('pointercancel', handlePointerUp);

        // Run
        Render.run(render);
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        // Resize Observer (Keep logic mostly same)
        const resizeObserver = new ResizeObserver(() => {
            if (!sceneRef.current || !renderRef.current) return;
            const newWidth = sceneRef.current.clientWidth;
            const newHeight = sceneRef.current.clientHeight;
            if (newWidth === 0 || newHeight === 0) return;

            renderRef.current.canvas.width = newWidth;
            renderRef.current.canvas.height = newHeight;
            renderRef.current.options.width = newWidth;
            renderRef.current.options.height = newHeight;

            Matter.Mouse.setOffset(mouse, { x: 0, y: 0 });

            Body.setPosition(ground, { x: newWidth / 2, y: newHeight + (wallThickness / 2) - 40 });
            Body.setPosition(leftWall, { x: 0 - (wallThickness / 2), y: newHeight / 2 });
            Body.setPosition(rightWall, { x: newWidth + (wallThickness / 2), y: newHeight / 2 });
            Body.setPosition(ceiling, { x: newWidth / 2, y: headerGap - (wallThickness / 2) });

            const targetRadius = calculateSmartRadius(newWidth, newHeight, CLIENTS.length);
            if (Math.abs(targetRadius - radiusRef.current) > 1) {
                const scale = (targetRadius + 2) / (radiusRef.current + 2);
                titans.forEach(b => Body.scale(b, scale, scale));
                radiusRef.current = targetRadius;
                setVisualRadius(targetRadius);
            }
        });

        resizeObserver.observe(sceneRef.current);

        return () => {
            resizeObserver.disconnect();
            if (render.canvas) {
                render.canvas.removeEventListener('pointerdown', handlePointerDown);
                render.canvas.removeEventListener('pointermove', handlePointerMove);
                render.canvas.removeEventListener('pointerup', handlePointerUp);
                render.canvas.removeEventListener('pointercancel', handlePointerUp);
            }
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            World.clear(world, false);
            Engine.clear(engine);
        };
    }, []);

    return (
        <div
            className="w-full h-full relative overflow-hidden group select-none bg-transparent"
        >
            {/* Visual Header Line */}
            <div className="absolute top-[100px] left-0 w-full border-t border-white/10 z-20 pointer-events-none" />

            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-50 z-20">
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Click to Release</span>
            </div>

            {/* DOM Elements */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {CLIENTS.map((client, i) => (
                    <div
                        key={i}
                        ref={(el) => { titanRefs.current[i] = el; }}
                        style={{
                            width: visualRadius * 2,
                            height: visualRadius * 2,
                        }}
                        className="absolute top-0 left-0 bg-transparent rounded-full border-0 shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center justify-center overflow-hidden will-change-transform transition-[width,height] duration-300 ease-out"
                    >
                        {/* Logo content remains same */}
                        <div className="relative w-[70%] h-[70%] flex items-center justify-center">
                            <img
                                src={client.logo}
                                alt={client.name}
                                className="object-contain"
                            />
                            <span className="absolute bottom-0 inset-x-0 flex items-center justify-center text-[8px] font-bold text-white text-center leading-tight bg-black/50 p-0.5">
                                {client.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Canvas Container - Touch Action Enabled */}
            <div
                ref={sceneRef}
                className="w-full h-[400px] md:h-[500px] cursor-grab active:cursor-grabbing relative z-30"
                style={{ touchAction: 'pan-y' }}
            />
        </div>
    );
}
