"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export default function ChatWidget() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        // Update messages with user input
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
                }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            // Read the streamed response
            const reader = response.body?.getReader();
            if (!reader) throw new Error("No response body");

            const decoder = new TextDecoder();
            let assistantContent = "";
            const assistantId = (Date.now() + 1).toString();

            // Add placeholder for assistant message
            setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "" }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                assistantContent += chunk;

                // Update the assistant message in real-time
                setMessages(prev =>
                    prev.map(m => m.id === assistantId ? { ...m, content: assistantContent } : m)
                );
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[90vw] md:w-[400px] h-[500px] bg-[#0c0c0c]/90 bg-clip-padding backdrop-filter backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700">
                                        <img
                                            src="/juan-avatar.jpg"
                                            alt="Juan Salán"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0c0c0c] rounded-full animate-pulse"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-100 text-sm">Juan Digital Clone</h3>
                                    <p className="text-xs text-green-400">Online & Ready</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Close chat"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-500 text-sm mt-10 px-6">
                                    <p>¡Hola! Soy el Gemelo Digital de Juan Salán.</p>
                                    <p className="mt-2 text-xs">Escríbeme "Hola" para empezar.</p>
                                </div>
                            )}
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl p-3 text-sm ${m.role === "user"
                                            ? "bg-blue-600/20 text-blue-100 border border-blue-600/30"
                                            : "bg-gray-800/50 text-gray-200 border border-gray-700"
                                            }`}
                                    >
                                        {m.content || "..."}
                                    </div>
                                </div>
                            ))}
                            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-800/50 rounded-2xl p-3 flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 bg-gray-900/30">
                            <div className="relative flex items-center">
                                <input
                                    className="w-full bg-[#111] text-gray-200 border border-gray-700 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Escribe un mensaje..."
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-1.5 bg-blue-600 p-1.5 rounded-full text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={!isOpen ? { y: [0, -8, 0] } : { y: 0 }}
                transition={{
                    y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 z-50 hover:shadow-blue-500/40 transition-shadow"
            >
                {isOpen ? (
                    <X className="text-white" />
                ) : (
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20">
                        <img
                            src="/juan-avatar.jpg"
                            alt="Chat with Juan"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </motion.button>
        </div>
    );
}
