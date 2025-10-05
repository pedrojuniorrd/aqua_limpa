// src/components/Hero.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ReportModal from './modals/ReportModal';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';

/**
 * Componente da seção Hero.
 * Contém a lógica para proteger a AÇÃO de reportar, decidindo qual
 * modal abrir com base no status de autenticação do usuário.
 * Não deve causar redirecionamentos.
 */
const Hero = () => {
  const { status } = useSession();
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  // Esta é a função chave: ela decide o que fazer quando o botão é clicado.
  const handleReportClick = () => {
    // Se o usuário está autenticado, abra o modal de reporte.
    if (status === 'authenticated') {
      setReportModalOpen(true);
    } else {
      // Caso contrário, abra o modal de login para que ele possa entrar.
      setLoginModalOpen(true);
    }
  };

  // Função para permitir a troca do modal de login para o de registro
  const handleSwitchToRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  return (
    <>
      <section className="hero" id="home">
        <div className="container">
          <h1>Juntos contra a poluição das águas</h1>
          <p>
            AquaLimpa é uma plataforma colaborativa para reportar e limpar focos
            de lixo em rios, lagos e áreas costeiras. Participe e faça a
            diferença!
          </p>
          {/* O botão agora usa a lógica do handleReportClick */}
          <button className="btn" onClick={handleReportClick}>
            Reportar Foco de Lixo
          </button>
        </div>
      </section>

      {/* Renderização condicional de todos os modais que o Hero pode precisar abrir */}
      {isReportModalOpen && <ReportModal onClose={() => setReportModalOpen(false)} />}
      {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} onSwitchToRegister={handleSwitchToRegister} />}
      {isRegisterModalOpen && <RegisterModal onClose={() => setRegisterModalOpen(false)} />}
    </>
  );
};

export default Hero;