"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Code2, Cpu, Globe, Zap, CheckCircle2 } from "lucide-react";

type Project = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    details: string;
    impact: string;
    tags: string[];
    tech: string;
    icon: any;
    color: string;
};

const projects: Project[] = [
    {
        id: 1,
        title: "Facturas Ordenadas",
        subtitle: "SaaS de automatización administrativa — Beta privada funcional",
        description: "Eliminación de tareas repetitivas mediante automatización e IA.",
        details: "El sistema detecta y procesa facturas desde Gmail y Drive, extrae datos clave de forma automática, los estructura y los deja listos para su uso en flujos contables y de control.",
        impact: "Reduce errores manuales y carga operativa con una arquitectura orientada a procesos reales, no a demos.",
        tags: ["SaaS", "FinTech", "AI"],
        tech: "TypeScript · Node.js · Fastify · PostgreSQL · Prisma · Docker · Google Cloud",
        icon: Zap,
        color: "from-blue-500 to-cyan-400"
    },
    {
        id: 2,
        title: "Lead Flow Automation",
        subtitle: "Sistema de captación y respuesta inteligente",
        description: "Mejora de la eficiencia operativa y experiencia de usuario desde el primer contacto.",
        details: "Cada registro en la landing se procesa automáticamente: almacenamiento estructurado y activación de respuesta inmediata por email.",
        impact: "Sustituye fricción humana por flujos claros y controlados, asegurando fidelidad y rapidez.",
        tags: ["Automation", "CRM", "Marketing"],
        tech: "Google Apps Script · Google Sheets · Automatización de email · Integración web",
        icon: Cpu,
        color: "from-purple-500 to-pink-500"
    },
    {
        id: 3,
        title: "Ocean Streamer",
        subtitle: "Monitoring en tiempo real de condiciones marítimas",
        description: "Sistema de captura y emisión de vídeo para la playa de Las Canteras.",
        details: "Conexión de webcam remota vía DNS dinámico (No-IP) a entorno local para emisión 24/7 en YouTube vía OBS.",
        impact: "Resolución de problemas de conectividad remota y acceso público continuo a datos visuales.",
        tags: ["IoT", "Streaming", "Networks"],
        tech: "Webcam IP · No-IP · OBS Studio · YouTube Streaming · Redes local",
        icon: Globe,
        color: "from-emerald-500 to-teal-400"
    },
    {
        id: 4,
        title: "AI Digital Twin Portfolio",
        subtitle: "Esta plataforma — Gemelo Digital e Ingeniería de Prompts",
        description: "Portfolio interactivo con IA integrada y arquitectura de alto rendimiento.",
        details: "Desarrollado mediante 'Pair Programming' con agentes de IA, utilizando refinamiento iterativo de prompts para crear una experiencia de usuario premium.",
        impact: "Integra un 'Cerebro Digital' capaz de representar mi trayectoria y resolver dudas técnicas en tiempo real.",
        tags: ["AI Twin", "UX/UI", "Next.js"],
        tech: "Next.js 15 · OpenAI GPT-5-nano · Framer Motion · Tailwind CSS · AI SDK",
        icon: Code2,
        color: "from-orange-500 to-red-500"
    }
];

const ProjectCard = ({ project }: { project: Project }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
                relative bg-[#0c0c0c] border border-gray-800 rounded-2xl overflow-hidden cursor-pointer
                transition-all duration-300 hover:border-gray-600
                ${isExpanded ? "shadow-2xl ring-1 ring-blue-500/20" : "hover:bg-white/5"}
            `}
        >
            <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${project.color} text-white shadow-lg shrink-0`}>
                            <project.icon size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white transition-colors leading-tight">
                                {project.title}
                            </h3>
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">
                                {project.id === 4 ? "Meta Project" : project.tags[0]}
                            </p>
                        </div>
                    </div>

                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="text-gray-600"
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="mt-6 pt-6 border-t border-gray-800"
                        >
                            <p className="text-xs font-mono text-blue-400 mb-3 uppercase tracking-wider">
                                {project.subtitle}
                            </p>

                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                {project.details}
                            </p>

                            <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-6">
                                <div className="flex gap-3">
                                    <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                    <p className="text-gray-400 text-xs italic leading-relaxed">
                                        {project.impact}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <Code2 size={14} className="text-gray-600" />
                                <p className="text-[11px] font-mono text-gray-500">
                                    {project.tech}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-12 px-4 bg-[#050505] relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                    >
                        Proyectos <span className="text-gray-500">_Seleccionados</span>
                    </motion.h2>
                </div>

                <div className="flex flex-col gap-3">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
