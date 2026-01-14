import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Keep these imports
import "./globals.css";
import { AcademicProvider } from "@/context/AcademicContext";

const geistSans = Geist({
  variable: "--font-geist-sans",  // Keep the variable name consistent with globals.css
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juan Salán Vila | El Arquitecto del Orden",
  description: "Portfolio interactivo de Juan Salán Vila. Business Operations Specialist & Creative Technologist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AcademicProvider>
          {children}
        </AcademicProvider>
      </body>
    </html>
  );
}
