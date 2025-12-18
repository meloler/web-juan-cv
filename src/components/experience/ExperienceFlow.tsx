"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Briefcase } from "lucide-react";

interface ExperienceItem {
    id: number;
    role: string;
    company: string;
    period: string;
    description: string;
    details: {
        challenge: string;
        solution: string;
        impact: string;
    };
    tech: string[];
    type: "academic" | "business";
    color: string; // Added for UI styling
}

const experienceData: ExperienceItem[] = [
    {
        id: 1,
        role: "Profesor Universitario (Negocios Digitales)",
        company: "Universidad del Atlántico Medio",
        period: "Feb 2025 - Presente",
        description: "Formando a la próxima generación en economía digital y tecnología aplicada.",
        details: {
            challenge: "Conectar la teoría académica con la realidad operativa de las empresas.",
            solution: "Diseño de planes de estudio basados en casos reales, uso de IA y herramientas No-Code en el aula.",
            impact: "Alumnos capacitados para entornos laborales digitales desde el día 1."
        },
        tech: ["Docencia", "Estrategia Digital", "Mentoring"],
        type: "academic",
        color: "from-amber-600 to-orange-500"
    },
    {
        id: 2,
        role: "Consultor de Operaciones & Automatización",
        company: "Salán Producciones / Freelance",
        period: "2010 - Presente",
        description: "Transformando el caos manual en sistemas eficientes.",
        details: {
            challenge: "Eliminar la carga administrativa repetitiva y los errores humanos en la gestión.",
            solution: "Desarrollo de scripts a medida (Google Apps Script, n8n) y migración a entornos cloud.",
            impact: "Ahorro de +3h semanales de gestión manual y reducción drástica de errores operativos."
        },
        tech: ["Google Apps Script", "n8n", "Make", "Google Workspace"],
        type: "business",
        color: "from-blue-600 to-cyan-500"
    },
    {
        id: 3,
        role: "Consultor Tecnológico (Power Platform)",
        company: "Cognitia Tech",
        period: "Nov 2024 - May 2025",
        description: "Auditoría y optimización de procesos corporativos.",
        details: {
            challenge: "Digitalizar flujos de trabajo obsoletos en clientes corporativos.",
            solution: "Implementación de Microsoft Power Automate y casos de uso de IA aplicada.",
            impact: "Identificación de oportunidades de automatización y mejora en la toma de decisiones."
        },
        tech: ["Power Automate", "Consultoría", "IA Analysis"],
        type: "business",
        color: "from-violet-600 to-purple-500"
    },
    {
        id: 4,
        role: "Marketing Data Analyst & CRM Lead",
        company: "Caetano Fórmula (Renault)",
        period: "Nov 2023 - Oct 2024",
        description: "Optimización de funnel y analítica de datos.",
        details: {
            challenge: "Desconexión entre marketing y ventas; leads perdidos en el funnel.",
            solution: "Integración de Zoho CRM con campañas (Ads) y creación de dashboards de atribución real.",
            impact: "+25% en leads cualificados y optimización del Coste por Lead (CPL)."
        },
        tech: ["Zoho CRM", "Google Ads", "Looker Studio", "Meta Ads"],
        type: "business",
        color: "from-emerald-600 to-green-500"
    },
    {
        id: 5,
        role: "Client Engagement & Ops Specialist",
        company: "Kraken Digital Asset Exchange",
        period: "Jun 2020 - Nov 2022",
        description: "Operaciones críticas en entorno Fintech remoto y regulado.",
        details: {
            challenge: "Gestionar onboarding masivo cumpliendo normativas estrictas (KYC/AML) sin fricción.",
            solution: "Ejecución de procesos de verificación complejos y reporte técnico de bugs a ingeniería.",
            impact: "+700 clientes institucionales verificados y mejora de UX en procesos de compliance."
        },
        tech: ["Compliance Ops", "Zendesk", "Remote Work", "Crypto"],
        type: "business",
        color: "from-indigo-600 to-blue-500"
    },
    {
        id: 6,
        role: "Marketing Manager (Ducati)",
        company: "Domingo Alonso Group",
        period: "May 2017 - Jun 2019",
        description: "Gestión de marca premium y estrategia omnicanal.",
        details: {
            challenge: "Sincronizar la experiencia de concesionario físico con el e-commerce.",
            solution: "Implementación de estrategia omnicanal unificando stock y promociones.",
            impact: "Optimización logística y coherencia de marca en todos los canales."
        },
        tech: ["Omnicanalidad", "SAP", "E-commerce", "Brand Management"],
        type: "business",
        color: "from-red-600 to-rose-500"
    }
];

export default function ExperienceFlow() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <section className="py-12 relative overflow-hidden bg-[#050505]">
            {/* Background Spikes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-50" />

            <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                    >
                        Experiencia <span className="text-gray-500">_Profesional</span>
                    </motion.h2>
                </div>
                {experienceData.map((exp, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50 }}
                            whileInView={{ opacity: 1, y: 0, x: 0 }}
                            viewport={{ margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`flex flex-col md:flex-row items-center justify-between mb-16 w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                            {/* Card Side */}
                            <div className={`w-full md:w-5/12 ${isEven ? 'text-right' : 'text-left'}`}>
                                <motion.div
                                    layoutId={`card-${exp.id}`}
                                    onClick={() => setSelectedId(exp.id)}
                                    className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-500 cursor-pointer transition-colors relative group w-full"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {/* Corner Accents */}
                                    <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-20 h-20 bg-gradient-to-br ${exp.color} opacity-10 blur-xl rounded-full`} />

                                    <div className={`flex flex-col ${isEven ? 'md:items-end items-start' : 'items-start'}`}>
                                        <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${exp.color} bg-clip-text text-transparent mb-1`}>
                                            {exp.type === 'academic' ? 'ACADEMIC' : 'BUSINESS'}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-100">{exp.role}</h3>
                                        <p className="text-sm text-gray-400 font-medium mb-2">{exp.company}</p>
                                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed opacity-80">
                                            {exp.description}
                                        </p>
                                    </div>

                                    <div className={`mt-4 flex ${isEven ? 'md:justify-end' : 'justify-start'} items-center gap-2`}>
                                        {/* Mobile Button */}
                                        <button className="md:hidden px-4 py-2 bg-white/10 rounded-full text-xs text-white font-medium border border-white/10 flex items-center gap-2 hover:bg-white/20 transition-colors">
                                            + Info
                                        </button>

                                        {/* Desktop Hover Text */}
                                        <span className="hidden md:inline-block text-xs text-blue-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                            + Ver detalles
                                        </span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Center Spine Dot */}
                            <div className="relative z-20 w-full md:w-2/12 flex justify-center my-8 md:my-0 h-4 md:h-auto">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} ring-4 ring-[#050505] shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20`}
                                />
                                {/* Mobile Line */}
                                <div className="absolute top-0 md:hidden h-full w-[1px] bg-gray-800" />

                                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${isEven ? 'right-1/2' : 'left-1/2'} w-full h-[1px] bg-gradient-to-r ${exp.color} opacity-30 -z-10`} />
                            </div>

                            {/* Date Side (Hidden Text as requested, but keeping layout balance) */}
                            <div className={`w-full md:w-5/12 ${isEven ? 'text-left' : 'text-right'} hidden md:block opacity-0`}>
                                <span className="text-5xl font-bold text-gray-800/50 font-mono select-none block">
                                    {exp.period.split(" ")[0]}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Expanded View Modal */}
            <AnimatePresence>
                {selectedId !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 text-left">
                        <div className="absolute inset-0" onClick={() => setSelectedId(null)} />

                        {(() => {
                            const exp = experienceData.find((e) => e.id === selectedId)!;
                            return (
                                <motion.div
                                    layoutId={`card-${selectedId}`}
                                    className="w-full max-w-3xl bg-[#0e0e0e] border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
                                >
                                    {/* Header */}
                                    <div className={`p-8 bg-gradient-to-r ${exp.color} relative overflow-hidden`}>
                                        <div className="absolute top-0 right-0 p-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors text-white z-20"
                                        >
                                            <X size={20} />
                                        </button>

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-2 opacity-80">
                                                <Calendar size={14} />
                                                <span className="text-sm font-mono">{exp.period}</span>
                                            </div>
                                            <motion.h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                                                {exp.role}
                                            </motion.h2>
                                            <div className="flex items-center gap-2 text-xl text-white/90 font-light">
                                                <MapPin size={18} />
                                                {exp.company}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 space-y-8 overflow-y-auto bg-[#0a0a0a]">

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {/* Challenge */}
                                            <div className="bg-white/5 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                                <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> El Reto
                                                </h4>
                                                <p className="text-gray-300 text-sm leading-relaxed">{exp.details.challenge}</p>
                                            </div>

                                            {/* Solution */}
                                            <div className="bg-white/5 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                                <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> La Solución
                                                </h4>
                                                <p className="text-gray-300 text-sm leading-relaxed">{exp.details.solution}</p>
                                            </div>

                                            {/* Impact */}
                                            <div className="bg-gradient-to-b from-green-500/10 to-green-500/5 p-5 rounded-xl border border-green-500/20">
                                                <h4 className="text-xs text-green-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Impacto
                                                </h4>
                                                <p className="text-white font-medium text-lg leading-snug">{exp.details.impact}</p>
                                            </div>
                                        </div>

                                        {/* Tech Stack Chips */}
                                        <div>
                                            <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-4">Tecnologías & Skills</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {exp.tech.map(tech => (
                                                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 font-mono hover:bg-white/10 transition-colors">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            );
                        })()}
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
