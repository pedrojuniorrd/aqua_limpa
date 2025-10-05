// src/components/EffectsManager.tsx
'use client';

import Script from 'next/script';
import { Fragment } from 'react';

// Declaração para o TypeScript
declare global {
  interface JQuery {
    ripples(options: {
      resolution?: number;
      perturbance?: number;
    }): JQuery;
  }
}

const EffectsManager = () => {
  // CORREÇÃO: A lista agora inclui '.ripple-overlay' para o mapa
  const selectorsToApply = ['.hero', '.features', '.site-footer', '.ripple-overlay'];

  const initializeRipples = () => {
    // Verificação para garantir que jQuery ($) está disponível
    if (typeof $ === 'undefined') {
      console.error("jQuery não foi carregado a tempo.");
      return;
    }
    try {
      selectorsToApply.forEach(selector => {
        // Aplica o efeito a cada seletor na lista
        $(selector).ripples({
          resolution: 512,
          perturbance: 0.02,
        });
      });
    } catch (e) {
      console.error("Erro ao iniciar o efeito ripples:", e);
    }
  };

  return (
    <Fragment>
      <Script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery.ripples/0.5.3/jquery.ripples.min.js"
        strategy="afterInteractive"
        onLoad={initializeRipples}
      />
    </Fragment>
  );
};

export default EffectsManager;