export interface IPreguntasPorLeccionRequest {
    id_leccion: number;
}

export interface IPregunta {
    id: number;
    id_leccion: number;
    pregunta: string;
    opciones: Array<any>;
}