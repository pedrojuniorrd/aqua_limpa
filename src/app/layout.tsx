// src/app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import ClientWrapper from "@/components/ClientWrapper";
// 1. Importe o novo gestor de efeitos
import EffectsManager from "@/components/EffectsManager";

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
      <body className={poppins.className}>
        <AuthProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </AuthProvider>

        {/* 2. Adicione o gestor de efeitos aqui. Ele cuidará de tudo. */}
        <EffectsManager />
      </body>
    </html>
  );
}