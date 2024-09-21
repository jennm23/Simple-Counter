import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function ContadorSegundos({ segundosIniciales }) {
  const [segundos, setSegundos] = useState(segundosIniciales);
  const [idIntervalo, setIdIntervalo] = useState(null);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);
    setIdIntervalo(id);

    return () => clearInterval(id);
  }, []);

  const formatearTiempo = (tiempo) => {
    return String(tiempo).padStart(6, '0').split('');
  };

  const pausarContador = () => {
    if (!pausado) {
      clearInterval(idIntervalo);
      setPausado(true);
    }
  };

  const resumirContador = () => {
    if (pausado) {
      const id = setInterval(() => {
        setSegundos((prev) => prev + 1);
      }, 1000);
      setIdIntervalo(id);
      setPausado(false);
    }
  };

  const reiniciarContador = () => {
    clearInterval(idIntervalo);
    setSegundos(0);
    const id = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);
    setIdIntervalo(id);
    setPausado(false);
  };

  return (
    <div className="bg-dark text-white d-flex justify-content-center align-items-center p-3">
      <div className="d-flex align-items-center">
        <i className="fa-regular fa-clock fa-4x bg-black p-3 m-1 rounded"></i>
        <div className="d-flex">
          {formatearTiempo(segundos).map((digito, index) => (
            <div key={index} className="d-flex justify-content-center align-items-center bg-black text-white display-4 p-3 m-1 rounded" style={{ width: '50px', textAlign: 'center' }}>
              {digito}
            </div>
          ))}
        </div>
      </div>
      <div className="ms-3">
        <button className="btn btn-secondary me-2" onClick={pausarContador}>
          Pausar
        </button>
        <button className="btn btn-secondary me-2" onClick={resumirContador}>
          Resumir
        </button>
        <button className="btn btn-secondary" onClick={reiniciarContador}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}

export default ContadorSegundos;
