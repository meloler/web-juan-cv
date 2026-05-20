"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Workflow, TrendingUp, BrainCircuit, CheckCircle2, ChevronDown, Layers, Database, Cpu, UsersRound } from "lucide-react";

type StackItem = {
    name: string;
    type: string;
    level: "Alto" | "Avanzado" | "Intermedio" | "Práctico";
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
        id: "coordination",
        icon: UsersRound,
        title: "Coordinación entre negocio y equipos técnicos",
        description: "Muchos proyectos fallan porque negocio, perfiles técnicos y colaboradores no hablan el mismo idioma.",
        solutionTitle: "Traducción, seguimiento y claridad operativa",
        stack: [
            { name: "Gestión de stakeholders", type: "Comunicación transversal", level: "Alto" },
            { name: "Documentación funcional", type: "Requisitos y seguimiento", level: "Avanzado" },
            { name: "Herramientas de proyecto", type: "Trello · Jira · Slack · GitHub", level: "Práctico" }
        ],
        color: "from-blue-400 to-cyan-500"
    },
    {
        id: "automation",
        icon: Workflow,
        title: "Procesos manuales y carga administrativa",
        description: "Cuando la información está repartida entre correos, carpetas y hojas de cálculo, aparecen errores y pérdida de tiempo.",
        solutionTitle: "Automatización aplicada a operaciones reales",
        stack: [
            { name: "Google Workspace", type: "Gmail · Drive · Sheets", level: "Alto" },
            { name: "Apps Script / n8n", type: "Automatización y webhooks", level: "Avanzado" },
            { name: "IA aplicada", type: "Clasificación, extracción y apoyo operativo", level: "Práctico" }
        ],
        color: "from-emerald-400 to-cyan-500"
    },
    {
        id: "digital-projects",
        icon: TrendingUp,
        title: "Transformación digital con sentido práctico",
        description: "No todo necesita una gran plataforma. A veces el valor está en ordenar procesos, medir mejor y avanzar por iteraciones.",
        solutionTitle: "Producto, datos y mejora continua",
        stack: [
            { name: "CRM / ERP", type: "Sistemas de información empresarial", level: "Alto" },
            { name: "Dashboards", type: "Control y toma de decisiones", level: "Intermedio" },
            { name: "Metodologías ágiles", type: "Scrum · iteración · priorización", level: "Intermedio" }
        ],
        color: "from-orange-400 to-red-500"
    },
    {
        id: "education",
        icon: BrainCircuit,
        title: "Formación y adopción tecnológica",
        description: "La tecnología solo funciona si las personas entienden para qué sirve y cómo incorporarla a su trabajo.",
        solutionTitle: "Docencia, comunicación y adopción digital",
        stack: [
            { name: "Docencia universitaria", type: "Sistemas de información y negocio digital", level: "Alto" },
            { name: "Explicación no técnica", type: "Bajar conceptos complejos al terreno", level: "Alto" },
            { name: "Cambio operativo", type: "Acompañamiento y mejora de procesos", level: "Avanzado" }
        ],
        color: "from-purple-400 to-pink-500"
    }
];

const SolutionPanel = ({ activeScenario }: { activeScenario: Scenario }) => (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 relative overflow-hidden mt-6">
        <div className="relative z-10 mb-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeScenario.color} animate-pulse`} />
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Cómo lo enfoco</span>
            </div>
            <h4 className={`text-xl font-bold bg-gradient-to-r ${activeScenario.color} bg-clip-text text-transparent`}>
                {activeScenario.solutionTitle}
            </h4>
        </div>

        <div className="relative z-10 space-y-3">
            {activeScenario.stack.map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-gray-900 rounded-lg text-gray-400">
                            {idx === 0 ? <Layers size={14} /> : idx === 1 ? <Cpu size={14} /> : <Database size={14} />}
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
            className={`relative bg-[#0c0c0c] border border-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-gray-600 ${isExpanded ? "shadow-2xl ring-1 ring-blue-500/20" : "hover:bg-white/5"}`}
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
                                Competencia aplicada
                            </p>
                        </div>
                    </div>

                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="text-gray-600">
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
                                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-2">Reto habitual:</span>
                                    <p className="text-gray-400 text-sm leading-relaxed">{scenario.description}</p>
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        <span className="text-gray-500">Input:</span> Competencias
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Lo que aporto cuando un proyecto necesita coordinación, tecnología, comunicación y ejecución práctica.
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
