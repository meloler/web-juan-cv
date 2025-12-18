"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, Briefcase, ChevronRight } from "lucide-react";

type CommandLog = { text: string; prefix: string; status: "success" | "pending" | "warning" | "info" };

const terminalData = {
    tech: [
        { text: "Initializing automation environment...", prefix: "[init]", status: "info" },
        { text: "Resolving dependencies for Google Workspace...", prefix: "[wait]", status: "pending" },
        { text: "Installed google-apps-script@latest", prefix: "[ok]", status: "success" },
        { text: "Fetching n8n-workflow-engine...", prefix: "[fetch]", status: "pending" },
        { text: "Loaded n8n / Make (Low-Code Core)", prefix: "[ok]", status: "success" },
        { text: "Mounting Microsoft Power Platform...", prefix: "[mount]", status: "pending" },
        { text: "Connected to OpenAI API (Model: GPT-4o)", prefix: "[conn]", status: "warning" },
        { text: "Verifying Looker Studio Analytics...", prefix: "[check]", status: "info" },
        { text: "✨ Tech Stack successfully hydrated.", prefix: "[done]", status: "success" },
    ] as CommandLog[],
    business: [
        { text: "Executing ./run_business_ops.sh", prefix: "[exec]", status: "info" },
        { text: "Loading module: Omnichannel Strategy", prefix: "[load]", status: "pending" },
        { text: "Optimizing Sales Funnel (Zoho CRM)", prefix: "[opt]", status: "success" },
        { text: "Initializing Crisis Management Protocol...", prefix: "[init]", status: "warning" },
        { text: "Mounting University Teaching Core...", prefix: "[mount]", status: "success" },
        { text: "Compiling CRO & Data Analysis...", prefix: "[build]", status: "pending" },
        { text: "✅ Business Operations Online & Ready.", prefix: "[success]", status: "success" },
    ] as CommandLog[]
};

export default function TerminalSection() {
    const [logs, setLogs] = useState<CommandLog[]>([]);
    const [currentCommand, setCurrentCommand] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [activeTab, setActiveTab] = useState<"tech" | "business" | null>(null);

    const runCommand = async (cmd: "tech" | "business") => {
        if (isTyping || activeTab === cmd) return;

        setLogs([]);
        setActiveTab(null);
        setIsTyping(true);
        setCurrentCommand("");

        const commandText = cmd === "tech" ? "npm install --stack tech" : "./run_business_ops.sh";

        // Typewriter effect for command
        for (let i = 0; i <= commandText.length; i++) {
            setCurrentCommand(commandText.slice(0, i));
            await new Promise(r => setTimeout(r, 40));
        }

        await new Promise(r => setTimeout(r, 300)); // Processing delay
        setActiveTab(cmd);

        // Simulate log streaming
        const data = terminalData[cmd];
        for (let i = 0; i < data.length; i++) {
            setLogs(prev => [...prev, data[i]]);
            await new Promise(r => setTimeout(r, Math.random() * 300 + 100)); // Random valid delay
        }

        setIsTyping(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "success": return "text-green-400";
            case "warning": return "text-yellow-400";
            case "pending": return "text-blue-400";
            default: return "text-gray-400";
        }
    };

    return (
        <section className="min-h-screen py-20 px-4 md:px-20 flex flex-col justify-center items-center bg-transparent relative z-10">
            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel rounded-lg overflow-hidden border border-gray-800 bg-[#0c0c0c]/90 shadow-2xl font-mono"
                >
                    {/* Terminal Header */}
                    <div className="bg-[#1a1a1a] p-3 flex items-center justify-between border-b border-gray-800">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="text-gray-500 text-sm font-mono flex items-center gap-2">
                            <Terminal size={14} />
                            <span>juan@command-center:~</span>
                        </div>
                        <div className="w-16" />
                    </div>

                    {/* Terminal Body */}
                    <div className="p-6 md:p-8 min-h-[500px] text-sm md:text-base text-gray-300">

                        {/* Control Buttons */}
                        <div className="mb-8 flex gap-4 border-b border-gray-800 pb-6">
                            <button
                                onClick={() => runCommand("tech")}
                                disabled={isTyping}
                                className={`px-4 py-2 border rounded transition-all flex items-center gap-2 ${activeTab === "tech" ? "border-cyan-500 text-cyan-500 bg-cyan-500/10" : "border-gray-700 hover:border-gray-500 text-gray-400"} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                <Cpu size={16} />
                                Install Tech Stack
                            </button>
                            <button
                                onClick={() => runCommand("business")}
                                disabled={isTyping}
                                className={`px-4 py-2 border rounded transition-all flex items-center gap-2 ${activeTab === "business" ? "border-green-500 text-green-500 bg-green-500/10" : "border-gray-700 hover:border-gray-500 text-gray-400"} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                <Briefcase size={16} />
                                Exec Business Ops
                            </button>
                        </div>

                        {/* Active Command Line */}
                        <div className="flex items-center gap-2 font-bold text-lg mb-6">
                            <span className="text-green-500">➜</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-white">{currentCommand}</span>
                            {isTyping && (
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="w-2.5 h-5 bg-gray-400 inline-block align-middle"
                                />
                            )}
                        </div>

                        {/* Log Output */}
                        <div className="space-y-2 font-mono">
                            {logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex gap-3"
                                >
                                    <span className={`min-w-[4rem] ${getStatusColor(log.status)}`}>{log.prefix}</span>
                                    <span className="text-gray-300">{log.text}</span>
                                </motion.div>
                            ))}
                            {activeTab && !isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-green-500 mt-4 animate-pulse"
                                >
                                    ➜ _
                                </motion.div>
                            )}
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
