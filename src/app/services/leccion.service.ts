import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ILeccionRequest } from '../models/leccion.models';

@Injectable({
  providedIn: 'root'
})
export class LeccionService {

  constructor(private httpService: HttpService) { }

  public obtenerLeccion(req: ILeccionRequest){
    return this.httpService.post('/leccion', req);
  }

  public obtenerTitulos(req: ILeccionRequest){
    return this.httpService.post('/titulos', req);
  }

  public obtenerLecciones(req: ILeccionRequest){
    return this.httpService.post('/lecciones', req);
  }

  public obtenerRecursos(req: ILeccionRequest){
    return this.httpService.post('/recursos', req);
  }
  
}
