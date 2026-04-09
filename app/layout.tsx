import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme_provider";
import "@/app/globals.css";
import React from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NutriCommand - Panel de control nutricional",
  description: "Centro de control profesional para el seguimiento nutricional y la gestión de pacientes",
  //generator: "Company name".
  icons: {
    icon: [
      {
      url: "/icon-light-32x32.png",
      media: "()prefers-color-scheme: light",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark",
      },
      {
        url: "icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  }
};


export default function RootLayout({children}:
   {children:React.ReactNode}) {
    return (
      <html lang="es" suppressHydrationWarning className="light">
        <body className="font-sans antialiased bg-background text-foreground">
          <ThemeProvider
            attribute= "class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            >
            
            {children} 
          </ThemeProvider>
        </body>
      </html>
    )
  }

