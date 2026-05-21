"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ParticlesBackground from "./ParticlesBackground";

const TypewriterText = ({ texts }: { texts: string[] }) => {
    const [index, setIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[index];
        const speed = isDeleting ? 42 : 82;

        const timeout = setTimeout(() => {
            if (!isDeleting && displayedText !== currentText) {
                setDisplayedText(currentText.slice(0, displayedText.length + 1));
            } else if (isDeleting && displayedText !== "") {
                setDisplayedText(currentText.slice(0, displayedText.length - 1));
            } else if (!isDeleting && displayedText === currentText) {
                setTimeout(() => setIsDeleting(true), 1900);
            } else if (isDeleting && displayedText === "") {
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
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 py-28">
            <ParticlesBackground />

            <div className="z-10 text-center max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-5"
                >
                    <p className="text-xs md:text-sm font-mono text-blue-300 uppercase tracking-[0.35em] mb-5">
                        Transformación digital · IA aplicada · Docencia universitaria
                    </p>
                    <h1 className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-primary-light tracking-tight">
                        Juan Salán Vila
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 1 }}
                    className="text-xl md:text-3xl font-light text-gray-300 mb-8"
                >
                    <TypewriterText
                        texts={[
                            "Coordinación de proyectos tecnológicos",
                            "Automatización e IA aplicada a negocio",
                            "Conectando personas, procesos y tecnología",
                            "Profesor de sistemas de información y negocio digital"
                        ]}
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.8 }}
                    className="max-w-3xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed"
                >
                    Perfil híbrido entre negocio, operaciones y tecnología. Diseño sistemas, automatizaciones y proyectos digitales que convierten problemas reales en procesos claros, medibles y accionables.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3"
                >
                    <a href="#projects" className="px-5 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors">
                        Ver proyectos reales
                    </a>
                    <a href="#contact" className="px-5 py-3 rounded-full border border-white/15 text-white text-sm font-semibold hover:bg-white/10 transition-colors">
                        Contactar
                    </a>
                </motion.div>
            </div>

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
