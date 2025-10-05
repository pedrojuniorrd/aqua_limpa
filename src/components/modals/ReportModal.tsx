// src/components/modals/ReportModal.tsx
'use client';

import { useState, useMemo, useRef } from 'react';
import { useSWRConfig } from 'swr';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// --- MUDANÇA AQUI ---
import L, { LatLngExpression, Map, DragEndEvent } from 'leaflet';

interface ReportModalProps {
  onClose: () => void;
}

// Pequeno componente auxiliar para capturar eventos do mapa
function MapEvents({ setPosition }: { setPosition: (position: LatLngExpression) => void }) {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return null;
}

const ReportModal = ({ onClose }: ReportModalProps) => {
  const { mutate } = useSWRConfig();
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression | null>(null);
  const [trashType, setTrashType] = useState('');
  const [description, setDescription] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const mapRef = useRef<Map>(null);

  const handleGetLocation = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPos: LatLngExpression = [latitude, longitude];
        setMarkerPosition(newPos);
        mapRef.current?.flyTo(newPos, 16);
        setIsLocating(false);
      },
      (error) => {
        alert('Não foi possível obter sua localização.');
        console.error(error);
        setIsLocating(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!markerPosition) {
      alert('Por favor, marque um local no mapa antes de enviar.');
      return;
    }
    if (!trashType || !description) {
      alert('Por favor, preencha o tipo de lixo e a descrição.');
      return;
    }

    const reportData = {
      lat: (markerPosition as number[])[0],
      lng: (markerPosition as number[])[1],
      type: trashType,
      description,
    };

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) throw new Error('Falha ao enviar o reporte.');

      alert('Reporte enviado com sucesso!');
      mutate('/api/reports');
      onClose();
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao enviar seu reporte.');
    }
  };

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2>Reportar Foco de Lixo</h2>
        <form id="report-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Localização (Clique no mapa ou use sua localização)</label>
            <div className="report-map-container">
              <MapContainer
                ref={mapRef}
                center={[-2.53, -44.30]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <MapEvents setPosition={setMarkerPosition} />
                {markerPosition && (
                  <Marker 
                    position={markerPosition} 
                    draggable={true}
                    // --- CORREÇÃO AQUI ---
                    eventHandlers={{
                      dragend: (e: DragEndEvent) => {
                        const { lat, lng } = e.target.getLatLng();
                        setMarkerPosition([lat, lng]);
                      },
                    }}
                  />
                )}
              </MapContainer>
            </div>
            <button
              type="button"
              className="btn"
              onClick={handleGetLocation}
              disabled={isLocating}
              style={{ marginTop: '10px' }}
            >
              {isLocating ? 'Obtendo...' : 'Usar minha localização atual'}
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="trash-type">Tipo de lixo</label>
            <select id="trash-type" value={trashType} onChange={(e) => setTrashType(e.target.value)} required>
              <option value="" disabled>Selecione o tipo</option>
              <option value="plastic">Plástico</option>
              <option value="glass">Vidro</option>
              <option value="metal">Metal</option>
              <option value="other">Outros</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea id="description" placeholder="Descreva a situação..." value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>
          
          <div className="form-group">
             <label htmlFor="photo">Foto (opcional)</label>
             <input type="file" id="photo" accept="image/*" />
          </div>

          <button type="submit" className="btn">Enviar Reporte</button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;