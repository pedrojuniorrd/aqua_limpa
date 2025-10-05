// src/app/layout.tsx
import type { Metadata } from "next";
// 1. Importe a fonte 'Poppins' do Next/Google
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import ClientWrapper from "@/components/ClientWrapper";

// 2. Configure a fonte
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'] 
});

export const metadata: Metadata = {
  title: "AquaLimpa - Combate à Poluição das Águas",
  description: "Plataforma colaborativa para reportar e limpar focos de lixo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {/* 3. Aplique a classe da fonte ao body */}
      <body className={poppins.className}>
        <AuthProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}