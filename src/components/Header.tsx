// src/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';

const Header = () => {
  const { data: session, status } = useSession();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu mobile

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSwitchToRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <Link href="/" className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24A104.11,104.11,0,0,0,24,128c0,42.3,25.43,78.6,61.7,94.25a8,8,0,0,0,8.3-1.89L128,168l34,52.36a8,8,0,0,0,8.3,1.89C206.57,206.6,232,170.3,232,128A104.11,104.11,0,0,0,128,24Zm0,128.23L92.2,95.78a35.8,35.8,0,0,1,35.8-35.78,35.8,35.8,0,0,1,35.8,35.78Z"></path>
              </svg>
              <span>AquaLimpa</span>
            </Link>
            
            <ul className="nav-links">
              <li><a href="#home">Início</a></li>
              <li><a href="#mapa">Mapa</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>

            <div className="nav-actions">
              {status === 'authenticated' ? (
                <>
                  <span className="user-greeting">Olá, {session.user?.name}</span>
                  <Link href="/dashboard" className="btn">Painel</Link>
                  <button onClick={() => signOut({ callbackUrl: '/' })} className="btn">Sair</button>
                </>
              ) : (
                <button className="btn" onClick={() => setLoginModalOpen(true)}>Entrar</button>
              )}
            </div>

            <button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,88H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
              </svg>
            </button>
          </nav>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Início</a>
            <a href="#mapa" onClick={() => setIsMenuOpen(false)}>Mapa</a>
            <a href="#contato" onClick={() => setIsMenuOpen(false)}>Contato</a>
          </div>
        )}
      </header>

      {!session && isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} onSwitchToRegister={handleSwitchToRegister} />}
      {!session && isRegisterModalOpen && <RegisterModal onClose={() => setRegisterModalOpen(false)} />}
    </>
  );
};

export default Header;