import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MateGame - Aprende Matemáticas Jugando",
  description: "Plataforma educativa gamificada para que niños de 6 a 12 años aprendan matemáticas de forma divertida. De 1º a 6º de primaria.",
  keywords: ["MateGame", "matemáticas", "niños", "educación", "gamificación", "primaria", "aprender jugando"],
  authors: [{ name: "MateGame" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "MateGame - Aprende Matemáticas Jugando",
    description: "La forma más divertida de aprender matemáticas. Para niños de 1º a 6º de primaria.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#58CC02",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${nunito.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: 'var(--font-nunito), system-ui, sans-serif' }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
