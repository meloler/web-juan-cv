"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

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
                    Usa el formulario y me llegará directamente al correo para poder responderte desde ahí.
                </p>
            </motion.div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                action="https://formsubmit.co/juansalanvila@gmail.com"
                method="POST"
                className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm"
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

            <footer className="mt-16 text-gray-600 text-sm font-mono text-center">
                <p>&copy; {new Date().getFullYear()} Juan Salán Vila. All systems operational.</p>
                <p className="mt-2 text-xs opacity-50">Built with Next.js, Tailwind & Love.</p>
            </footer>
        </section>
    );
}
