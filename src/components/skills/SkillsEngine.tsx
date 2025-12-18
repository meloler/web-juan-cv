"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Workflow, TrendingUp, ShieldAlert, BrainCircuit, CheckCircle2, ChevronDown, Layers, Database, Cpu, X } from "lucide-react";

type StackItem = {
    name: string;
    type: string;
    level: "Expert" | "Advanced" | "Intermediate" | "Pro" | "High" | "Mid-High";
};

type Scenario = {
    id: string;
    icon: any;
    title: string;
    description: string;
    solutionTitle: string;
    stack: StackItem[];
    color: string;
};

const scenarios: Scenario[] = [
    {
        id: "automation",
        icon: Workflow,
        title: "Caos Operativo & Procesos Manuales",
        description: "El equipo pierde tiempo en tareas repetitivas y hay errores humanos constantes.",
        solutionTitle: "Arquitectura de Automatización",
        stack: [
            { name: "Consultoría de Procesos", type: "Análisis Operativo", level: "High" },
            { name: "Google Apps Script", type: "Scripting a medida", level: "High" },
            { name: "APIs & Webhooks", type: "Integración", level: "Mid-High" }
        ],
        color: "from-emerald-400 to-cyan-500"
    },
    {
        id: "growth",
        icon: TrendingUp,
        title: "Fuga de Leads & Datos Dispersos",
        description: "Marketing invierte pero Ventas no cierra. No hay trazabilidad del ROI.",
        solutionTitle: "Ecosistema Omnicanal & Data",
        stack: [
            { name: "CRM", type: "Gestión de Relación", level: "High" },
            { name: "Google/Meta Ads", type: "Tráfico Cualificado", level: "Mid-High" },
            { name: "Dashboard", type: "Business Intelligence", level: "Mid-High" }
        ],
        color: "from-orange-400 to-red-500"
    },
    {
        id: "support",
        icon: ShieldAlert,
        title: "Gestión de Crisis & Soporte",
        description: "Alto volumen de tickets, usuarios frustrados o incidentes de seguridad.",
        solutionTitle: "Protocolo de Respuesta & Ops",
        stack: [
            { name: "Zendesk/Support Ops", type: "Ticketing & SLAs", level: "Expert" },
            { name: "AI Integration", type: "Asistencia Inteligente", level: "Advanced" },
            { name: "Crisis Comm", type: "Gestión de Reputación", level: "Expert" }
        ],
        color: "from-purple-400 to-pink-500"
    },
    {
        id: "education",
        icon: BrainCircuit,
        title: "Brecha Digital en Equipos",
        description: "La tecnología existe pero el equipo no sabe usarla o hay resistencia al cambio.",
        solutionTitle: "Metodología Docente",
        stack: [
            { name: "Docencia Universitaria", type: "Pedagogía", level: "Pro" },
            { name: "Mentoring Técnico", type: "Adopción Digital", level: "Pro" },
            { name: "Documentación", type: "Soporte Asíncrono", level: "Advanced" }
        ],
        color: "from-blue-400 to-indigo-500"
    }
];

const SolutionPanel = ({ activeScenario }: { activeScenario: Scenario }) => (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 relative overflow-hidden mt-6">
        {/* Header */}
        <div className="relative z-10 mb-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeScenario.color} animate-pulse`} />
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">System Output</span>
            </div>
            <h4 className={`text-xl font-bold bg-gradient-to-r ${activeScenario.color} bg-clip-text text-transparent`}>
                {activeScenario.solutionTitle}
            </h4>
        </div>

        {/* Stack Items */}
        <div className="relative z-10 space-y-3">
            {activeScenario.stack.map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-gray-900 rounded-lg text-gray-400">
                            {idx === 0 ? <Layers size={14} /> :
                                idx === 1 ? <Cpu size={14} /> :
                                    <Database size={14} />
                            }
                        </div>
                        <div>
                            <div className="font-bold text-gray-200 text-xs">{item.name}</div>
                            <div className="text-[10px] text-gray-500 font-mono">{item.type}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-[8px] font-bold text-gray-600 bg-gray-900 px-1.5 py-0.5 rounded leading-none">
                            {item.level.toUpperCase()}
                        </div>
                        <CheckCircle2 size={14} className="text-blue-500" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const SkillItem = ({ scenario }: { scenario: Scenario }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const Icon = scenario.icon;

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
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${scenario.color} text-white shadow-lg shrink-0`}>
                            <Icon size={20} />
                        </div>
                        <div>
                            <h3 className={`text-lg font-bold transition-colors ${isExpanded ? "text-white" : "text-gray-300"}`}>
                                {scenario.title}
                            </h3>
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">
                                Challenge Response
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
                            transition={{ duration: 0.3 }}
                            className="mt-6 pt-6 border-t border-gray-800"
                        >
                            <div className="space-y-4">
                                <div>
                                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-2">Problem Statement:</span>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {scenario.description}
                                    </p>
                                </div>

                                <SolutionPanel activeScenario={scenario} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default function SkillsEngine() {
    return (
        <section id="skills" className="py-12 px-4 bg-black relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        <span className="text-gray-500">Input:</span> Skills
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Arquitectura de soluciones aplicada a desafíos reales de negocio.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {scenarios.map((scenario) => (
                        <SkillItem key={scenario.id} scenario={scenario} />
                    ))}
                </div>
            </div>
        </section>
    );
}
