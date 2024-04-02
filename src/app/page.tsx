"use client";
import React, { useState } from 'react';
import Procesos from '@/app/Components/Procesos';
import RAMInfo from '@/app/Components/RAMinfo';
import { Proceso, RamInfoData } from '@/Interfaces/types';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import StatsBar from '@/app/Components/Barra';

const Page = () => {
  const [procesos, setProcesos] = useState<Proceso[]>([]);
  const [ramInfo, setRamInfo] = useState<RamInfoData>({
    tamañoTotal: 7502.0,
    tamañoUsado: 0.0,
    tamañoDisponible: 7502.0,
    tamañoInstalado: 8192.0,
  });
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [partitions, setPartitions] = useState([]);

  const generarDireccionFisica = () => {
    const direccion = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
    return `0x${direccion.padStart(8, '0')}`;
  };
  
  console.log('Total Size:', ramInfo.tamañoInstalado);
  console.log('Used Size:', ramInfo.tamañoUsado);
  console.log('Reserved For Hardware:', 690);

  // Función para actualizar la información de la memoria RAM
  const actualizarRAMInfo = (nuevaInfo: RamInfoData) => {
    setRamInfo(nuevaInfo);
  };

  const handleCrearProceso = (nombre: string, tamaño: number) => {
    if (tamaño > ramInfo.tamañoDisponible) {
      setMostrarAlerta(true);
      setTimeout(() => {
        setMostrarAlerta(false);
      }, 3000);
    } else {
      const nuevaDireccion = generarDireccionFisica();
      const nuevaPrioridad = procesos.length + 1;
      const nuevoProceso: Proceso = {
        id: procesos.length + 1,
        nombre,
        tamaño,
        estado: 'Activo',
        dirFisica: nuevaDireccion,
        prioridad: nuevaPrioridad,
      };
      setRamInfo({
        ...ramInfo,
        tamañoUsado: ramInfo.tamañoUsado + tamaño,
        tamañoDisponible: ramInfo.tamañoDisponible - tamaño,
      });
      
      setProcesos([...procesos, nuevoProceso]);
    }
  };

  const handlePriorizarProceso = (id: number) => {
    const procesoPriorizar = procesos.find(proceso => proceso.id === id);
    if (procesoPriorizar) {
      procesoPriorizar.prioridad = 1;
      const procesosActualizados = procesos.map(proceso => {
        if (proceso.id !== id && proceso.prioridad !== undefined) {
          proceso.prioridad += 1;
        }
        return proceso;
      });
      const procesosOrdenados = procesosActualizados.sort((a, b) => (a.prioridad || 0) - (b.prioridad || 0));
      setProcesos(procesosOrdenados);
    }
  };

  const handleEliminarProceso = (id: number, tamaño: number) => {
    const procesosFiltrados = procesos.filter(proceso => proceso.id !== id);
    setProcesos(procesosFiltrados);
    setRamInfo({
      ...ramInfo,
      tamañoUsado: ramInfo.tamañoUsado - tamaño,
      tamañoDisponible: ramInfo.tamañoDisponible + tamaño,
    });
  };

  return (
    <div>
      <Procesos
        procesos={procesos}
        onCrearProceso={handleCrearProceso}
        onPriorizarProceso={handlePriorizarProceso}
        onEliminarProceso={handleEliminarProceso}
      />

      <RAMInfo ramInfo={ramInfo} />

      <StatsBar
        totalSize={ramInfo.tamañoInstalado}
        usedSize={ramInfo.tamañoUsado}
        reservedForHardware={690}
        
      />

      {mostrarAlerta && (
        <Stack sx={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', zIndex: 9999 }}>
          <Alert
            variant="filled"
            severity="error"
            onClose={() => setMostrarAlerta(false)}
            sx={{ maxWidth: '800px', overflow: 'hidden' }}
          >
            No hay suficiente espacio de Memoria RAM para agregar el proceso. Finalice otros procesos primero.
          </Alert>
        </Stack>
      )}
    </div>
  );
};

export default Page;
