import React from 'react';
import { Proceso } from '@/Interfaces/types';
import MemoryIcon from '@mui/icons-material/Memory';
import { Placeholder } from 'react-bootstrap';

export interface ProcesosProps {
  procesos: Proceso[];
  onCrearProceso: (nombre: string, tamaño: number, dirFisica: string) => void;
  onPriorizarProceso: (id: number) => void;
  onEliminarProceso: (id: number, tamaño: number) => void;
}

const Procesos: React.FC<ProcesosProps> = ({
  procesos,
  onCrearProceso,
  onPriorizarProceso,
  onEliminarProceso
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const nombre = form.nombre.value;
    const tamaño = parseFloat(form.tamaño.value); 
    const dirFisica = Math.floor(Math.random() * 16777215).toString(16);

    if (nombre && tamaño) {
      onCrearProceso(nombre, tamaño, dirFisica);
      form.reset();
    }
  };

  const handlePriorizarClick = (id: number) => {
    onPriorizarProceso(id);
  };

  return (
    <div className='mx-6'>
      <div className="flex justify-center items-center pt-14 pb-20">
          <div className="card border-light mb-3 w-6/12 h-4">
            <div className="card-header text-center font-bold text-2xl">PROCESOS</div>
            <div className="card-body px-10 pt-4 pb-2 mb-4 border" >  
            <form onSubmit={handleSubmit} className="text-neutral-400 mb-4">
                <div className="">
                  <div className="flex-1 mr-2">
                  <label className="block mb-1 text-white"> Nombre del Proceso:
                </label> 
                    <input type="text" name="nombre" required className="w-full  rounded p-2 bg-neutral-600 " placeholder="Proceso" /> 
                    <label className="pt-4 block mb-1 text-white">Tamaño del Proceso (MB):</label>
                    <input type="text" name="tamaño" step="0.1" required className="w-full  rounded p-2  bg-neutral-600" placeholder="Tamaño" />
                  </div>
                </div>
                <button type="submit" className=" w-full mt-4 bg-sky-800 text-black px-4 py-3 rounded hover:bg-sky-950 font-bold">Crear Proceso</button>
              </form>
            </div>
          </div>
       </div>


      <table className="mt-24 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="text-center bg-gray-200">
            <th className="border border-zinc-400 px-4 py-2">Dirección Fisica</th>
            <th className="border border-zinc-400 px-4 py-2">PID</th>
            <th className="border border-zinc-400 px-4 py-2">Proceso</th>
            <th className="border border-zinc-400 px-4 py-2">Asignado (MB)</th>
            <th className="border border-zinc-400 px-4 py-2">Estado</th>
            <th className="border border-zinc-400 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {procesos.map((proceso) => (
            <tr className="bg-gray-900 text-center" key={proceso.id}>
              <td className="border border-zinc-400 px-4 py-2 text-white">{proceso.dirFisica}</td>
              <td className="border border-zinc-400 px-4 py-2 text-white">00{proceso.id}</td>
              <td className="border border-zinc-400 px-4 py-2 text-white">{proceso.nombre}</td>
              <td className="border border-zinc-400 px-4 py-2 text-white">{Number.isInteger(proceso.tamaño) ? proceso.tamaño : proceso.tamaño.toFixed(2)}</td>
              <td className="border border-zinc-400 px-4 py-2 text-white">{proceso.estado}</td>
              <td className="border border-zinc-400 px-4 py-2">
                <div className="flex items-center justify-center">
                  <button onClick={() => handlePriorizarClick(proceso.id)} className="bg-blue-500 text-white font-bold px-3 py-1 rounded hover:bg-blue-600 mr-2">Priorizar</button>
                  <button onClick={() => onEliminarProceso(proceso.id, proceso.tamaño)} className="bg-red-700 text-black px-3 font-bold py-1 rounded hover:bg-red-600">Finalizar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Procesos;
