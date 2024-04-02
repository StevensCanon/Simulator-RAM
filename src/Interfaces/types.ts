export interface Proceso {
    dirFisica: string;
    id: number;
    nombre: string;
    tamaño: number;
    estado: string;
    prioridad?: number; 
  }

  export interface RamInfoData {
    tamañoTotal: number;
    tamañoUsado: number;
    tamañoDisponible: number;
    tamañoInstalado: number;
  }
  
