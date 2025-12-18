"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, MessageCircle } from "lucide-react";

function MagneticButton({
    children,
    href,
    color = "bg-gray-800"
}: {
    children: React.ReactNode;
    href: string;
    color?: string;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.2, y: y * 0.2 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`
        relative flex flex-col items-center justify-center 
        w-40 h-40 md:w-56 md:h-56 rounded-2xl 
        border border-gray-700/50 backdrop-blur-md 
        shadow-lg hover:shadow-2xl hover:border-white/20 transition-all z-10
        group overflow-hidden
      `}
        >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-white`} />
            <div className="relative z-10 text-gray-300 group-hover:text-white transition-colors flex flex-col items-center gap-4">
                {children}
            </div>
        </motion.a>
    );
}

export default function ContactSection() {
    return (
        <section className="py-12 px-4 flex flex-col items-center justify-center bg-gradient-to-t from-black via-[#050505] to-transparent">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600"
            >
                Conectemos
            </motion.h2>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <MagneticButton href="https://linkedin.com/in/juansv" color="bg-blue-600">
                    <Linkedin size={48} strokeWidth={1} />
                    <span className="text-sm font-medium tracking-wider">LINKEDIN</span>
                </MagneticButton>

                <MagneticButton href="mailto:juansalanvila@gmail.com" color="bg-red-600">
                    <Mail size={48} strokeWidth={1} />
                    <span className="text-sm font-medium tracking-wider">EMAIL</span>
                </MagneticButton>

                <MagneticButton href="https://wa.me/34685101737" color="bg-green-600">
                    <MessageCircle size={48} strokeWidth={1} />
                    <span className="text-sm font-medium tracking-wider">WHATSAPP</span>
                </MagneticButton>
            </div>

            <footer className="mt-16 text-gray-600 text-sm font-mono text-center">
                <p>&copy; {new Date().getFullYear()} Juan Salán Vila. All systems operational.</p>
                <p className="mt-2 text-xs opacity-50">Built with Next.js 14, Tailwind & Love.</p>
            </footer>
        </section>
    );
}
