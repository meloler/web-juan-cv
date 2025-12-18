"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Mode = "professional" | "academic";

interface AcademicContextType {
    mode: Mode;
    toggleMode: () => void;
    isAcademic: boolean;
}

const AcademicContext = createContext<AcademicContextType | undefined>(undefined);

export function AcademicProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<Mode>("professional");

    const toggleMode = () => {
        setMode((prev) => (prev === "professional" ? "academic" : "professional"));
    };

    const isAcademic = mode === "academic";

    // Effect to update body class/attributes for styling hooks if needed
    useEffect(() => {
        if (isAcademic) {
            document.documentElement.classList.add("academic-mode");
        } else {
            document.documentElement.classList.remove("academic-mode");
        }
    }, [isAcademic]);

    return (
        <AcademicContext.Provider value={{ mode, toggleMode, isAcademic }}>
            {children}
        </AcademicContext.Provider>
    );
}

export function useAcademic() {
    const context = useContext(AcademicContext);
    if (context === undefined) {
        throw new Error("useAcademic must be used within an AcademicProvider");
    }
    return context;
}
