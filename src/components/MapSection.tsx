// src/components/MapSection.tsx
'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Report {
  _id: string; lat: number; lng: number; type: string;
  status: 'reported' | 'in_progress' | 'cleaned';
  description: string; userName?: string; createdAt: string;
}
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const typeTranslations: { [key: string]: string } = { plastic: 'Plástico', glass: 'Vidro', metal: 'Metal', other: 'Outros' };
const statusTranslations: { [key: string]: string } = { reported: 'Reportado', in_progress: 'Em Limpeza', cleaned: 'Limpo' };

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'reported', label: 'Reportado' },
  { value: 'in_progress', label: 'Em Limpeza' },
  { value: 'cleaned', label: 'Limpo' },
];

const typeOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'plastic', label: 'Plástico' },
  { value: 'glass', label: 'Vidro' },
  { value: 'metal', label: 'Metal' },
  { value: 'other', label: 'Outros' },
];


const MapSection = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const apiUrl = `/api/reports?status=${statusFilter}&type=${typeFilter}`;
  const { data: reports, error, isLoading } = useSWR<Report[]>(apiUrl, fetcher);

  return (
    <section className="map-section" id="mapa">
      {/* Esta div transparente irá receber o efeito de ondulação */}
      <div className="ripple-overlay"></div>

      <div className="container">
        <h2 className="section-title">Mapa de Reports</h2>
        
        <div className="filter-controls">
          <div className="filter-groups-wrapper">
            <div className="filter-group">
              <strong>Status:</strong>
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  className={`filter-btn ${statusFilter === option.value ? 'active' : ''}`}
                  onClick={() => setStatusFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="filter-group">
              <strong>Tipo:</strong>
              {typeOptions.map(option => (
                <button
                  key={option.value}
                  className={`filter-btn ${typeFilter === option.value ? 'active' : ''}`}
                  onClick={() => setTypeFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Buscar por localização..." />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
          </div>
        </div>
        
        {/* Nova div para dar personalidade ao mapa */}
        <div className="map-card">
            <MapContainer
              center={[-2.53, -44.30]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
              {isLoading && <p>Carregando reports...</p>}
              {error && <p>Falha ao carregar os reports.</p>}
              {reports && reports.map((report) => (
                <Marker key={report._id} position={[report.lat, report.lng]}>
                  <Popup>
                    <strong>Tipo:</strong> {typeTranslations[report.type] || report.type}<br />
                    <strong>Status:</strong> {statusTranslations[report.status] || report.status}<br />
                    <strong>Descrição:</strong> {report.description}<br />
                    <strong>Reportado por:</strong> {report.userName || 'Anônimo'}<br />
                    <strong>Data:</strong> {new Date(report.createdAt).toLocaleString('pt-BR')}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default MapSection;