// src/components/Footer.tsx

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="site-footer" id="contato">
      <div className="footer-shape-divider">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>

      <div className="container">
        <div className="footer-grid">
          {/* Coluna 1: Sobre */}
          <div className="footer-about">
            <Link href="/" className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24A104.11,104.11,0,0,0,24,128c0,42.3,25.43,78.6,61.7,94.25a8,8,0,0,0,8.3-1.89L128,168l34,52.36a8,8,0,0,0,8.3,1.89C206.57,206.6,232,170.3,232,128A104.11,104.11,0,0,0,128,24Zm0,128.23L92.2,95.78a35.8,35.8,0,0,1,35.8-35.78,35.8,35.8,0,0,1,35.8,35.78Z"></path>
              </svg>
              <span>AquaLimpa</span>
            </Link>
            <p>Combatendo a poluição das águas, um reporte de cada vez. Junte-se a nós nesta missão por um planeta mais limpo.</p>
          </div>

          {/* Coluna 2: Links de Navegação */}
          <div className="footer-links">
            <h4>Navegação</h4>
            <ul>
              <li><a href="#home">Início</a></li>
              <li><a href="#mapa">Mapa de Reports</a></li>
              <li><a href="#sobre">Como Funciona</a></li>
            </ul>
          </div>

          {/* Coluna 3: Links Legais */}
          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Termos de Uso</a></li>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div className="footer-social">
            <h4>Siga-nos</h4>
            <div className="social-icons">
              {/* --- CÓDIGO SVG CORRIGIDO ABAIXO --- */}
              <a href="#" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm16,104.38-8.33.05v63.57a8,8,0,0,1-16,0v-64h-16a8,8,0,0,1,0-16h16V104a24,24,0,0,1,24-24h16a8,8,0,0,1,0,16H152a8,8,0,0,0-8,8v8.43l8.33-.05a8,8,0,0,1,7.62,8.44l-1.42,16a8,8,0,0,1-7.95,7.18H144Z"></path></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm48-88a12,12,0,1,1-12-12A12,12,0,0,1,176,72Zm40,24a104.11,104.11,0,0,0-24-61.22,104.11,104.11,0,0,0-61.22-24,104.11,104.11,0,0,0-61.22,24,104.11,104.11,0,0,0-24,61.22,104.11,104.11,0,0,0,24,61.22,104.11,104.11,0,0,0,61.22,24,104.11,104.11,0,0,0,61.22-24,104.11,104.11,0,0,0,24-61.22ZM128,200c-30.82,0-80-1.86-80-72s49.18-72,80-72,80,1.86,80,72S158.82,200,128,200Z"></path></svg>
              </a>
              <a href="#" aria-label="Twitter / X">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm65.79,79.88-34,34a8,8,0,0,1-11.31,0l-22.63-22.63a8,8,0,0,0-11.31,0L81.82,148.12a8,8,0,0,1-11.31-11.31l34-34a8,8,0,0,1,11.31,0l22.63,22.63a8,8,0,0,0,11.31,0l32.72-32.72a8,8,0,0,1,11.32,11.31Z"></path></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 AquaLimpa - Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;