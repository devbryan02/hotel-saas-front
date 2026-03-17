import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zowy.app - Gestión hotelera",
  description: "Zowy.app es una plataforma de gestión hotelera que permite a los hoteleros gestionar sus reservas, habitaciones, huéspedes y mucho más.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
