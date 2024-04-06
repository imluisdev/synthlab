import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IPreguntasPorLeccionRequest } from '../models/pregunta.models';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private httpService: HttpService) { }

  public getPreguntasPorIDLeccion(req: IPreguntasPorLeccionRequest){
    return this.httpService.post('/preguntas_por_leccion', req);
  }

  public getPreguntasConOpcionesPorLeccion(req: IPreguntasPorLeccionRequest){
    return this.httpService.post('/preguntas_con_respuesta_por_leccion', req);
  }

}
