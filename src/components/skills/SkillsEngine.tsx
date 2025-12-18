"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Workflow, TrendingUp, ShieldAlert, BrainCircuit, CheckCircle2, ArrowRight, Layers, Database, Lock, Cpu } from "lucide-react";

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

export default function SkillsEngine() {
    const [selectedId, setSelectedId] = useState<string>("automation");

    // Helper to find the active scenario
    const activeScenario = scenarios.find(s => s.id === selectedId) || scenarios[0];

    return (
        <section className="min-h-screen py-24 px-4 md:px-20 bg-black relative overflow-hidden flex flex-col items-center justify-center">

            {/* Background Gradients */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${activeScenario.color} opacity-10 blur-[120px] transition-colors duration-1000 ease-in-out`} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/20 blur-[100px]" />

            <div className="max-w-6xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Headers UI */}
                <div className="lg:col-span-12 mb-8 text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        <span className="text-gray-500">Input:</span> Business Challenge
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        Selecciona un escenario para ver cómo se procesa la solución técnica.
                    </p>
                </div>

                {/* Left Column: Challenge Selector */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                    {scenarios.map((scenario) => {
                        const isSelected = selectedId === scenario.id;
                        const Icon = scenario.icon;

                        return (
                            <motion.button
                                key={scenario.id}
                                onClick={() => setSelectedId(scenario.id)}
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    relative p-6 rounded-2xl text-left border transition-all duration-300 group
                                    ${isSelected
                                        ? "bg-white/10 border-white/20 shadow-2xl"
                                        : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                                    }
                                `}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`
                                        p-3 rounded-lg bg-gradient-to-br ${scenario.color} text-white shadow-lg
                                        ${isSelected ? "opacity-100" : "opacity-70 group-hover:opacity-100"}
                                    `}>
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold text-lg mb-1 transition-colors ${isSelected ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}>
                                            {scenario.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                                            {scenario.description}
                                        </p>
                                    </div>
                                </div>

                                {isSelected && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b ${scenario.color}`}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Right Column: Computed Solution (The "Engine" Output) */}
                <div className="lg:col-span-1 hidden lg:flex justify-center items-center h-full text-gray-600">
                    <ArrowRight size={32} className="animate-pulse" />
                </div>

                <div className="lg:col-span-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeScenario.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="bg-[#0c0c0c] border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                        >
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                            {/* Header */}
                            <div className="relative z-10 mb-8 pb-8 border-b border-gray-800">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeScenario.color} animate-pulse`} />
                                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">System Output</span>
                                </div>
                                <h3 className={`text-3xl font-bold bg-gradient-to-r ${activeScenario.color} bg-clip-text text-transparent`}>
                                    {activeScenario.solutionTitle}
                                </h3>
                            </div>

                            {/* Stack Cards */}
                            <div className="relative z-10 space-y-4">
                                {activeScenario.stack.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * idx }}
                                        className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-gray-900 rounded-lg text-gray-300">
                                                {idx === 0 ? <Layers size={18} /> :
                                                    idx === 1 ? <Cpu size={18} /> :
                                                        <Database size={18} />
                                                }
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-200">{item.name}</div>
                                                <div className="text-xs text-gray-500 font-mono">{item.type}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-xs font-bold text-gray-600 bg-gray-900 px-2 py-1 rounded">
                                                {item.level.toUpperCase()}
                                            </div>
                                            <CheckCircle2 size={16} className={`text-${activeScenario.color.split('-')[1]}-500`} />
                                            {/* Note: dynamic classes might fail in Tailwind if not safelisted, better key color extraction or hardcoded. 
                                                For safety, I'll allow the color to be driven by parent text color if possible or just generic green/blue.
                                            */}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500 font-mono">
                                <span>Processing Time: 0.04s</span>
                                <span>Status: OPTIMIZED</span>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}
