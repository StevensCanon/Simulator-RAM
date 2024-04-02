import React, { useState } from 'react';
import Procesos from './Procesos';
import RAMInfo from './RAMinfo';
import { Proceso } from '@/Interfaces/types'; 

const App: React.FC = () => {
 
  const [procesos, setProcesos] = useState<Proceso[]>([]);
  

  const [ramInfo, setRamInfo] = useState<{ tamañoTotal: number; tamañoUsado: number; tamañoDisponible: number; tamañoInstalado: number;}>({
    tamañoTotal: 7502,
    tamañoUsado: 0,
    tamañoDisponible: 8192,
    tamañoInstalado: 8192,
  });

  
  const handleCrearProceso = (nombre: string, tamaño: number) => {
    
    const dirFisica = Math.floor(Math.random() * 16777215).toString(16); // Generar dirección física en hexadecimal
    const nuevoProceso: Proceso = { id: procesos.length + 1, nombre, tamaño, estado: 'Activo', dirFisica }; // Agregar dirFisica al nuevo proceso
    setProcesos([...procesos, nuevoProceso]);
    setRamInfo({
      ...ramInfo,
      tamañoUsado: ramInfo.tamañoUsado + tamaño,
      tamañoDisponible: ramInfo.tamañoDisponible - tamaño
    });
  };

  
  const handleSuspenderProceso = (id: number) => {
    
    const procesoActualizado = procesos.map(proceso => {
      if (proceso.id === id) {
        return { ...proceso, estado: 'Suspendido' };
      }
      return proceso;
    });
    setProcesos(procesoActualizado);
  };

  
  const handleEliminarProceso = (id: number, tamaño: number) => {
   
    const procesosFiltrados = procesos.filter(proceso => proceso.id !== id);
    setProcesos(procesosFiltrados);
    setRamInfo({
      ...ramInfo,
      tamañoUsado: ramInfo.tamañoUsado - tamaño,
      tamañoDisponible: ramInfo.tamañoDisponible + tamaño
    });
  };

  return (
    <div>
      <Procesos procesos={procesos} onEliminarProceso={handleEliminarProceso} onCrearProceso={handleCrearProceso} onPriorizarProceso={function (id: number): void {
        throw new Error('Function not implemented.');
      } } />
      <RAMInfo ramInfo={ramInfo} />
    </div>
  );
};

export default App;
