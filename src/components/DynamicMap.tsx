// src/components/DynamicMap.tsx
'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function DynamicMap() {
  const MapSection = useMemo(() => dynamic(
    () => import('@/components/MapSection'),
    { 
      loading: () => <p style={{textAlign: 'center', padding: '2rem'}}>Carregando mapa...</p>,
      ssr: false // A chave da solução: desabilita a renderização no servidor
    }
  ), []);

  return <MapSection />;
}