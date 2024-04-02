import React from 'react';

export interface RAMInfoProps {
  ramInfo: {
    tamañoTotal: number;
    tamañoUsado: number;
    tamañoDisponible: number;
    tamañoInstalado: number;
  };
}

const RAMInfo: React.FC<RAMInfoProps> = ({ ramInfo }) => {
  return (
    <div>
      <div className='font-bold pt-14 text-center text-white text-2xl'>
        <h2>Información de la Memoria RAM</h2>
      </div>
      <div className='justify-center  pt-5 flex gap-4 text-white'>
        <p>Tamaño Instalada (MB): {ramInfo.tamañoInstalado}</p>
        <p>Tamaño Total (MB): {ramInfo.tamañoTotal}</p>
        <p>Tamaño Usado (MB): {ramInfo.tamañoUsado.toFixed(2)}</p>
        <p>Tamaño Disponible (MB): {ramInfo.tamañoDisponible.toFixed(2)}</p>
      </div>
      <div className='justify-center  pt-1 pb-10 flex gap-4 text-white'>
        <p>Velocidad: 2667 MHz</p>
        <p>Ranuras usadas: 1 de 1</p>
        <p>Factor de forma: SODIMM</p>
        <p>Reservada para hardware: 690 MB</p>
      </div>
    </div>
  );
};

export default RAMInfo;
