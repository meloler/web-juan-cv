"use client";

import { Linkedin, Mail, MessageCircle } from "lucide-react";

export default function NavBar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-[2px] text-white">
            <div className="flex items-center gap-6">
                <div className="text-xl font-bold tracking-tighter">
                    JSV<span className="text-blue-500">.</span>
                </div>

                <div className="flex items-center gap-3">
                    <a href="https://linkedin.com/in/juansv" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn de Juan Salán Vila">
                        <Linkedin size={20} />
                    </a>
                    <a href="#contact" className="hover:text-blue-400 transition-colors" aria-label="Ir al formulario de contacto">
                        <Mail size={20} />
                    </a>
                    <a href="https://wa.me/34685101737" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors" aria-label="WhatsApp de Juan Salán Vila">
                        <MessageCircle size={20} />
                    </a>
                </div>
            </div>

            <a href="#projects" className="hidden md:inline-flex text-xs font-mono text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
                Proyectos
            </a>
        </nav>
    );
}
