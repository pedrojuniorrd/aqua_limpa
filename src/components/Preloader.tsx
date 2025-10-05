// src/components/Preloader.tsx
'use client';

interface PreloaderProps {
  isExiting: boolean;
}

const Preloader = ({ isExiting }: PreloaderProps) => {
  return (
    // A classe 'exiting' será adicionada para iniciar a animação de saída
    <div className={`preloader ${isExiting ? 'exiting' : ''}`}>
      <div className="preloader-text">
        Bem vindo ao projeto AquaLimpa
      </div>
      
      {/* As Ondas (SVG) */}
      <div className="waves">
        <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#159895" fillOpacity="0.7" d="M0,160L48,181.3C96,203,192,245,288,250.7C384,256,480,224,576,192C672,160,768,128,864,128C960,128,1056,160,1152,170.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <svg className="wave wave-back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#1a5f7a" fillOpacity="0.7" d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,202.7C672,224,768,224,864,208C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Preloader;