"use client";

import HeroSection from "@/components/hero/HeroSection";
import SkillsEngine from "@/components/skills/SkillsEngine";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ExperienceFlow from "@/components/experience/ExperienceFlow";
import ContactSection from "@/components/contact/ContactSection";
import ChatWidget from "@/components/chat/ChatWidget";
import NavBar from "@/components/layout/NavBar";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen relative selection:bg-cyan-500/30">
      <NavBar />
      <HeroSection />
      <SkillsEngine />
      <ProjectsSection />
      <ExperienceFlow />
      <ContactSection />
      <ChatWidget />
    </main>
  );
}
