"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import ParticlesBackground from "./ParticlesBackground";

const TypewriterText = ({ texts }: { texts: string[] }) => {
    const [index, setIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[index];
        const speed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting && displayedText !== currentText) {
                // Typing
                setDisplayedText(currentText.slice(0, displayedText.length + 1));
            } else if (isDeleting && displayedText !== "") {
                // Deleting
                setDisplayedText(currentText.slice(0, displayedText.length - 1));
            } else if (!isDeleting && displayedText === currentText) {
                // Finished typing, wait before delete
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayedText === "") {
                // Finished deleting, move to next text
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % texts.length);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, index, texts]);

    return (
        <span className="inline-block min-h-[1.5em] text-secondary font-mono">
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[2px] h-[1em] bg-secondary ml-1 align-middle"
            />
        </span>
    );
};

export default function HeroSection() {
    return (
        <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
            {/* Background Layer */}
            <ParticlesBackground />

            {/* Content Layer */}
            <div className="z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-4"
                >
                    <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-primary-light tracking-tight">
                        Juan Salán Vila
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-xl md:text-3xl font-light text-gray-300"
                >
                    <TypewriterText
                        texts={[
                            "Business Operations Specialist",
                            "Conectando Negocio y Tecnología",
                            "El Arquitecto del Orden"
                        ]}
                    />
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
