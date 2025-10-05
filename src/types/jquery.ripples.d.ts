// src/types/jquery.ripples.d.ts

// Importa a declaração original do jQuery para podermos estendê-la
import 'jquery';

// Estende a interface global do JQuery
declare global {
  interface JQuery {
    /**
     * Inicializa o plugin ripples com um objeto de opções.
     */
    ripples(options: {
      resolution?: number;
      dropRadius?: number;
      perturbance?: number;
      interactive?: boolean;
      crossOrigin?: string;
    }): JQuery;

    /**
     * Executa um comando no plugin ripples.
     */
    ripples(command: 'destroy' | 'drop' | 'pause' | 'play' | 'hide' | 'show' | 'update'): JQuery;
  }
}