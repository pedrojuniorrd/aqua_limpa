// src/components/ClientWrapper.tsx
'use client';

import { useState, useEffect } from 'react';
import Preloader from './Preloader';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Inicia a animação de saída após 4.5 segundos (2.5s para a animação de "aparecer" + 2s de duração)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 4500);

    // Remove completamente o preloader do DOM após a animação terminar (4.5s + 1.2s da transição)
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5700);

    // Limpa os timers se o componente for desmontado
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  return (
    <>
      {isLoading && <Preloader isExiting={isExiting} />}
      {children}
    </>
  );
}