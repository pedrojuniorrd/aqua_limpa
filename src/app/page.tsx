// src/app/page.tsx
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import DynamicMap from '@/components/DynamicMap'; // O componente que carrega o mapa

/**
 * Componente da Página Principal (Home) - Conteúdo PÚBLICO
 * Renderiza os componentes visíveis para todos os visitantes.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <DynamicMap />
      </main>
      <Footer />
    </>
  );
}