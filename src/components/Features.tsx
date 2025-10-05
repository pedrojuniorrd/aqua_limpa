// src/components/Features.tsx
import React from 'react';

const Features = () => {
  return (
    <section className="features" id="sobre">
      <div className="container">
        <h2 className="section-title">Como funciona</h2>
        <div className="features-grid">
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,34.82,23.18,73.43,88,124.74,64.82-51.31,88-89.92,88-124.74A88.1,88.1,0,0,0,128,16Zm0,208.33C77.49,181.5,48,145.83,48,104a80,80,0,0,1,160,0C208,145.83,178.51,181.5,128,224.33Z"></path></svg>
            </div>
            <h3>Reporte</h3>
            <p>Encontrou um foco de lixo? Reporte a localização e nos ajude a identificar áreas que precisam de limpeza.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M232,184a8,8,0,0,0-8,8v24a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H96a8,8,0,0,0,0-16H40a24,24,0,0,0-24,24V216a24,24,0,0,0,24,24H216a24,24,0,0,0,24-24V192A8,8,0,0,0,232,184Zm-96-80L51.3,55.36A8,8,0,1,0,38.64,66.62l96,96a8,8,0,0,0,11.32,0l48-48a8,8,0,0,0-11.32-11.32ZM208,32H160a8,8,0,0,0,0,16h22.63l-47,47a8,8,0,0,0,11.32,11.32l47-47V82.63a8,8,0,0,0,16,0V40A8,8,0,0,0,208,32Z"></path></svg>
            </div>
            <h3>Visualize</h3>
            <p>Acompanhe no mapa interativo todos os reports feitos pela comunidade.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M128,120a40,40,0,1,0-40-40A40,40,0,0,0,128,120Zm0-64a24,24,0,1,1-24,24A24,24,0,0,1,128,56Zm88,107.51a119.2,119.2,0,0,1-49.49,27.16,68,68,0,0,0-77,0A119.2,119.2,0,0,1,40,163.51V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16ZM40,152a120.35,120.35,0,0,1,32.89-80.54,40,40,0,1,0,51.47,51.47A120.35,120.35,0,0,1,40,152Z"></path></svg>
            </div>
            <h3>Participe</h3>
            <p>Junte-se a mutirões de limpeza e faça parte da solução para um meio ambiente mais limpo.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;