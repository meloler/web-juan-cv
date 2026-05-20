"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin } from "lucide-react";

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
    color: string;
}

const experienceData: ExperienceItem[] = [
    {
        id: 1,
        role: "Profesor Universitario",
        company: "Universidad del Atlántico Medio",
        period: "Feb 2025 - Presente",
        description: "Docencia en sistemas de información, negocio digital, marketing digital y tecnología aplicada.",
        details: {
            challenge: "Explicar tecnología, CRM, ERP, datos y transformación digital a perfiles de negocio de forma útil y aplicable.",
            solution: "Diseño clases, casos prácticos y actividades que conectan conceptos técnicos con decisiones reales de empresa.",
            impact: "Refuerzo constante de mi capacidad para comunicar, estructurar conocimiento y bajar conceptos complejos al terreno."
        },
        tech: ["Docencia", "Sistemas de Información", "CRM", "ERP", "Negocio Digital"],
        type: "academic",
        color: "from-amber-600 to-orange-500"
    },
    {
        id: 2,
        role: "Transformación Digital & Operaciones",
        company: "Salán Producciones / Freelance",
        period: "2010 - Presente",
        description: "Digitalización, automatización y mejora de procesos en una empresa real de eventos musicales.",
        details: {
            challenge: "Ordenar correos, facturas, documentación, webs y tareas operativas en un entorno con mucha carga manual.",
            solution: "Implementación de flujos con Google Workspace, automatizaciones, webs desplegadas en Vercel y sistemas internos de organización.",
            impact: "Menos fricción administrativa, mejor acceso a información y mayor capacidad para ejecutar campañas y eventos con agilidad."
        },
        tech: ["Google Workspace", "Apps Script", "n8n", "Vercel", "Automatización"],
        type: "business",
        color: "from-blue-600 to-cyan-500"
    },
    {
        id: 3,
        role: "Consultor Tecnológico",
        company: "Cognitia Tech",
        period: "Nov 2024 - May 2025",
        description: "Análisis de necesidades, discovery y traducción entre cliente y equipo técnico.",
        details: {
            challenge: "Entender problemas de negocio y convertirlos en oportunidades reales de digitalización o automatización.",
            solution: "Diagnóstico inicial, preguntas de negocio, definición funcional y coordinación con perfiles de Power Platform.",
            impact: "Me consolidó como nexo entre cliente, negocio y tecnología, especialmente en fases iniciales de proyecto."
        },
        tech: ["Power Platform", "Power Automate", "Discovery", "IA Aplicada", "Consultoría"],
        type: "business",
        color: "from-violet-600 to-purple-500"
    },
    {
        id: 4,
        role: "Marketing Data Analyst & CRM Lead",
        company: "Caetano Fórmula Canarias",
        period: "Nov 2023 - Oct 2024",
        description: "Optimización de funnel, CRM, campañas digitales y reporting comercial.",
        details: {
            challenge: "Conectar marketing y ventas para mejorar la calidad del lead y entender la atribución real.",
            solution: "Trabajo sobre Zoho CRM, campañas en Meta/Google Ads, dashboards y análisis de puntos de fricción del funnel.",
            impact: "Mejora de leads cualificados, mayor trazabilidad comercial y mejor conversación entre marketing y ventas."
        },
        tech: ["Zoho CRM", "Google Ads", "Meta Ads", "Looker Studio", "CRO"],
        type: "business",
        color: "from-emerald-600 to-green-500"
    },
    {
        id: 5,
        role: "Digital Product Manager",
        company: "SQUAADS",
        period: "May 2023 - Ago 2023",
        description: "Nexo entre cliente y equipo de desarrollo para definir producto, workflows y requisitos.",
        details: {
            challenge: "Convertir necesidades poco estructuradas de cliente en requisitos claros para el equipo técnico.",
            solution: "Interlocución directa, definición funcional, coordinación con desarrollo y explicación no técnica de avances.",
            impact: "Experiencia clave como traductor entre negocio y tecnología, una de mis competencias más fuertes."
        },
        tech: ["Producto Digital", "Requisitos", "Cliente", "UX", "Coordinación"],
        type: "business",
        color: "from-pink-600 to-fuchsia-500"
    },
    {
        id: 6,
        role: "Client Engagement & Customer Success",
        company: "Kraken Digital Asset Exchange",
        period: "Jun 2020 - Nov 2022",
        description: "Operaciones, soporte y mejora de producto en entorno fintech remoto y regulado.",
        details: {
            challenge: "Gestionar procesos de onboarding y soporte en un entorno de alto volumen, regulación y exigencia operativa.",
            solution: "Ejecución de procesos KYC/AML, gestión en Zendesk, reporte de bugs y propuestas de mejora a equipos técnicos.",
            impact: "Experiencia sólida en operaciones remotas, SLAs, comunicación escrita y mejora continua de producto."
        },
        tech: ["Zendesk", "KYC/AML", "Fintech", "Remote Ops", "Product Feedback"],
        type: "business",
        color: "from-indigo-600 to-blue-500"
    },
    {
        id: 7,
        role: "Marketing & Communications Coordinator",
        company: "Domingo Alonso Group",
        period: "May 2017 - Jun 2019",
        description: "Coordinación de comunicación online/offline entre marca, agencia y equipos internos.",
        details: {
            challenge: "Coordinar campañas, creatividades y acciones de marca con agencia externa y responsables internos.",
            solution: "Seguimiento de campañas, materiales, entregables y coherencia entre objetivos de marca y ejecución.",
            impact: "Base sólida en coordinación, comunicación, gestión de proveedores y ejecución de proyectos con equipos externos."
        },
        tech: ["Brand Management", "Agencias", "Campañas", "Comunicación", "Coordinación"],
        type: "business",
        color: "from-red-600 to-rose-500"
    }
];

export default function ExperienceFlow() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <section id="experience" className="py-12 relative overflow-hidden bg-[#050505]">
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
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Una trayectoria conectando comunicación, operaciones, cliente, producto, tecnología y docencia.
                    </p>
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
                            <div className={`w-full md:w-5/12 ${isEven ? 'text-right' : 'text-left'}`}>
                                <motion.div
                                    layoutId={`card-${exp.id}`}
                                    onClick={() => setSelectedId(exp.id)}
                                    className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-500 cursor-pointer transition-colors relative group w-full"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-20 h-20 bg-gradient-to-br ${exp.color} opacity-10 blur-xl rounded-full`} />

                                    <div className={`flex flex-col ${isEven ? 'md:items-end items-start' : 'items-start'}`}>
                                        <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${exp.color} bg-clip-text text-transparent mb-1`}>
                                            {exp.type === 'academic' ? 'DOCENCIA' : 'NEGOCIO'}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-100">{exp.role}</h3>
                                        <p className="text-sm text-gray-400 font-medium mb-2">{exp.company}</p>
                                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed opacity-80">
                                            {exp.description}
                                        </p>
                                    </div>

                                    <div className={`mt-4 flex ${isEven ? 'md:justify-end' : 'justify-start'} items-center gap-2`}>
                                        <button className="md:hidden px-4 py-2 bg-white/10 rounded-full text-xs text-white font-medium border border-white/10 flex items-center gap-2 hover:bg-white/20 transition-colors">
                                            + Info
                                        </button>
                                        <span className="hidden md:inline-block text-xs text-blue-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                            + Ver detalles
                                        </span>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="relative z-20 w-full md:w-2/12 flex justify-center my-8 md:my-0 h-4 md:h-auto">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} ring-4 ring-[#050505] shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20`}
                                />
                                <div className="absolute top-0 md:hidden h-full w-[1px] bg-gray-800" />
                                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${isEven ? 'right-1/2' : 'left-1/2'} w-full h-[1px] bg-gradient-to-r ${exp.color} opacity-30 -z-10`} />
                            </div>

                            <div className={`w-full md:w-5/12 ${isEven ? 'text-left' : 'text-right'} hidden md:block opacity-0`}>
                                <span className="text-5xl font-bold text-gray-800/50 font-mono select-none block">
                                    {exp.period.split(" ")[0]}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

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

                                    <div className="p-8 space-y-8 overflow-y-auto bg-[#0a0a0a]">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="bg-white/5 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                                <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> El reto
                                                </h4>
                                                <p className="text-gray-300 text-sm leading-relaxed">{exp.details.challenge}</p>
                                            </div>

                                            <div className="bg-white/5 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                                <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> La solución
                                                </h4>
                                                <p className="text-gray-300 text-sm leading-relaxed">{exp.details.solution}</p>
                                            </div>

                                            <div className="bg-gradient-to-b from-green-500/10 to-green-500/5 p-5 rounded-xl border border-green-500/20">
                                                <h4 className="text-xs text-green-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Impacto
                                                </h4>
                                                <p className="text-white font-medium text-lg leading-snug">{exp.details.impact}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-4">Herramientas & competencias</h4>
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
