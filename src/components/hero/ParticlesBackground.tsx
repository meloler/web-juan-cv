"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

export default function ParticlesBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        // console.log(container);
    }, []);

    return (
        <div className="absolute inset-0 -z-10">
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "transparent",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: ["repulse", "grab"], // Flee + Connect
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 100,
                                duration: 0.4,
                            },
                            grab: {
                                distance: 200,
                                line_linked: {
                                    opacity: 0.8,
                                },
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#003878", // Tech Blue
                        },
                        links: {
                            color: "#00b4d8", // Electric Blue
                            distance: 150,
                            enable: true, // Always show potential connections
                            opacity: 0.2, // Faint by default (Chaos)
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: true,
                            speed: 2, // Fast movement = Chaos
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 3 },
                        },
                        wobble: {
                            enable: true,
                            distance: 5,
                            speed: 10,
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    );
}
