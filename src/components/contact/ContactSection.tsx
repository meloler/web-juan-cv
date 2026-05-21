"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, MessageCircle, Send } from "lucide-react";

function MagneticButton({
    children,
    href
}: {
    children: React.ReactNode;
    href: string;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
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
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="relative flex flex-col items-center justify-center w-36 h-36 md:w-44 md:h-44 rounded-2xl border border-gray-700/50 backdrop-blur-md shadow-lg hover:shadow-2xl hover:border-white/20 transition-all z-10 group overflow-hidden"
        >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-white" />
            <div className="relative z-10 text-gray-300 group-hover:text-white transition-colors flex flex-col items-center gap-4">
                {children}
            </div>
        </motion.a>
    );
}

export default function ContactSection() {
    return (
        <section id="contact" className="py-16 px-4 flex flex-col items-center justify-center bg-gradient-to-t from-black via-[#050505] to-transparent">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">
                    Conectemos
                </h2>
                <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                    Puedes escribirme directamente o usar el formulario. Me llegará al correo y podré responderte desde ahí.
                </p>
            </motion.div>

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-8 items-stretch">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-center"
                >
                    <MagneticButton href="https://linkedin.com/in/juansv">
                        <Linkedin size={42} strokeWidth={1} />
                        <span className="text-xs font-medium tracking-wider">LINKEDIN</span>
                    </MagneticButton>

                    <MagneticButton href="mailto:juansalanvila@gmail.com?subject=Contacto%20desde%20tu%20portfolio">
                        <Mail size={42} strokeWidth={1} />
                        <span className="text-xs font-medium tracking-wider">EMAIL</span>
                    </MagneticButton>

                    <MagneticButton href="https://wa.me/34685101737">
                        <MessageCircle size={42} strokeWidth={1} />
                        <span className="text-xs font-medium tracking-wider">WHATSAPP</span>
                    </MagneticButton>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    action="https://formsubmit.co/juansalanvila@gmail.com"
                    method="POST"
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm"
                >
                    <input type="hidden" name="_subject" value="Nuevo contacto desde web-juan-cv.vercel.app" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <label className="flex flex-col gap-2 text-left">
                            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Nombre</span>
                            <input
                                type="text"
                                name="nombre"
                                required
                                placeholder="Tu nombre"
                                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-blue-400/70 transition-colors"
                            />
                        </label>

                        <label className="flex flex-col gap-2 text-left">
                            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Email</span>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="tu@email.com"
                                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-blue-400/70 transition-colors"
                            />
                        </label>
                    </div>

                    <label className="flex flex-col gap-2 text-left mb-4">
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Asunto</span>
                        <input
                            type="text"
                            name="asunto"
                            required
                            placeholder="¿Sobre qué quieres hablar?"
                            className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-blue-400/70 transition-colors"
                        />
                    </label>

                    <label className="flex flex-col gap-2 text-left mb-6">
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Mensaje</span>
                        <textarea
                            name="mensaje"
                            required
                            rows={5}
                            placeholder="Cuéntame brevemente en qué puedo ayudarte."
                            className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-blue-400/70 transition-colors resize-none"
                        />
                    </label>

                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-gray-200 transition-colors"
                    >
                        <Send size={16} />
                        Enviar mensaje
                    </button>

                    <p className="mt-4 text-xs text-gray-500 leading-relaxed text-center">
                        El formulario usa FormSubmit para enviarme el mensaje por email sin backend propio.
                    </p>
                </motion.form>
            </div>

            <footer className="mt-16 text-gray-600 text-sm font-mono text-center">
                <p>&copy; {new Date().getFullYear()} Juan Salán Vila. All systems operational.</p>
                <p className="mt-2 text-xs opacity-50">Built with Next.js, Tailwind & Love.</p>
            </footer>
        </section>
    );
}
