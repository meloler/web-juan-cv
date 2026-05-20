"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Code2, Cpu, Globe, Zap, CheckCircle2, Map, MessageSquareText, FileText, Github } from "lucide-react";

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
        subtitle: "Automatización documental para Gmail y Google Drive",
        description: "Sistema para reducir carga administrativa y ordenar facturas automáticamente.",
        details: "Flujo que detecta correos con facturas, clasifica documentos y los organiza en Google Drive para facilitar el control administrativo y los cierres trimestrales.",
        impact: "Convierte una tarea repetitiva y propensa a errores en un proceso más trazable, ordenado y fácil de revisar.",
        tags: ["Automatización", "Google Workspace", "IA"],
        tech: "Gmail · Google Drive · Apps Script · OCR/IA · Google Cloud",
        icon: Zap,
        color: "from-blue-500 to-cyan-400"
    },
    {
        id: 2,
        title: "ERP fiscal personal",
        subtitle: "Sistema propio para gestión como autónomo",
        description: "Control de facturas, ingresos, gastos, previsiones e impuestos.",
        details: "Herramienta interna para centralizar mi actividad económica como autónomo, visualizar previsiones y anticipar obligaciones fiscales como el modelo 130.",
        impact: "Me permite tener una visión clara de caja, fiscalidad y previsión, sin depender de hojas sueltas o cálculos improvisados.",
        tags: ["ERP", "Fiscalidad", "Dashboard"],
        tech: "Sheets · Automatización · Dashboard · Procesos fiscales",
        icon: FileText,
        color: "from-emerald-500 to-teal-400"
    },
    {
        id: 3,
        title: "Agenda Cultural GC",
        subtitle: "Pipeline de datos para eventos culturales en Gran Canaria",
        description: "Proyecto para recopilar, limpiar, clasificar y geolocalizar eventos culturales.",
        details: "Sistema de scraping y auditoría que recoge eventos de diferentes fuentes, elimina duplicados, mejora ubicaciones genéricas y prepara datos para una experiencia mobile-first.",
        impact: "Explora cómo convertir información cultural dispersa en una guía útil y accionable para descubrir planes en Gran Canaria.",
        tags: ["Datos", "Producto", "Cultura"],
        tech: "Python · Playwright · Supabase · Vercel · Geocoding · IA",
        icon: Map,
        color: "from-purple-500 to-pink-500"
    },
    {
        id: 4,
        title: "GPI SaaS MVP",
        subtitle: "Gestión de activos publicitarios",
        description: "MVP para centralizar activos, estados e información operativa.",
        details: "Proyecto SaaS orientado a ordenar activos publicitarios, facilitar seguimiento y mejorar la visualización de información que normalmente acaba dispersa entre hojas, carpetas y correos.",
        impact: "Ejercicio práctico de producto digital aplicado a gestión operativa, dashboards y coordinación de información.",
        tags: ["SaaS", "Gestión", "Dashboard"],
        tech: "React · Vite · Google Apps Script · Sheets · Slides API",
        icon: Cpu,
        color: "from-teal-500 to-emerald-400"
    },
    {
        id: 5,
        title: "Chatvoz / Voice Booking Agent",
        subtitle: "Agente de voz para reservas con lógica controlada",
        description: "Exploración de agentes conversacionales para pymes con reservas y agenda.",
        details: "Arquitectura donde el agente de voz conversa, pero las decisiones críticas pasan por un backend que valida disponibilidad, confirma datos y evita dobles reservas.",
        impact: "Une IA conversacional, automatización y lógica de negocio para resolver un caso real de atención repetitiva.",
        tags: ["Voice AI", "Agentes", "Reservas"],
        tech: "Node.js · Supabase · Webhooks · n8n · Vapi/Retell",
        icon: MessageSquareText,
        color: "from-orange-500 to-red-500"
    },
    {
        id: 6,
        title: "Salán Producciones Web",
        subtitle: "Web y landings para eventos musicales",
        description: "Modernización de presencia digital para producción de eventos.",
        details: "Migración hacia un flujo más ágil para publicar webs, landings, campañas y contenidos de eventos sin depender de procesos lentos en WordPress o hosting tradicional.",
        impact: "Aplicación directa de tecnología, marketing digital y automatización en una empresa real del sector cultural y musical.",
        tags: ["Web", "Eventos", "Marketing"],
        tech: "GitHub · Vercel · DNS · Analítica · Landing pages",
        icon: Globe,
        color: "from-slate-500 to-gray-400"
    }
];

const ProjectCard = ({ project }: { project: Project }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            onClick={() => setIsExpanded(!isExpanded)}
            className={`relative bg-[#0c0c0c] border border-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-gray-600 ${isExpanded ? "shadow-2xl ring-1 ring-blue-500/20" : "hover:bg-white/5"}`}
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
                                {project.tags[0]}
                            </p>
                        </div>
                    </div>

                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="text-gray-600">
                        <ChevronDown size={20} />
                    </motion.div>
                </div>

                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                    {project.description}
                </p>

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
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                    >
                        Proyectos <span className="text-gray-500">_Reales</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Cosas que he construido para aprender, resolver problemas reales y aplicar tecnología sin quedarme en la teoría.
                    </p>
                    <motion.a
                        href="https://github.com/meloler"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/10"
                    >
                        <Github size={18} />
                        Ver mi GitHub
                    </motion.a>
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
