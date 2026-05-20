import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AcademicProvider } from "@/context/AcademicContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juan Salán Vila | Transformación Digital, IA y Coordinación TI",
  description: "Portfolio de Juan Salán Vila: transformación digital, automatización, IA aplicada, coordinación de proyectos tecnológicos y docencia universitaria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AcademicProvider>
          {children}
        </AcademicProvider>
        <Analytics />
      </body>
    </html>
  );
}
