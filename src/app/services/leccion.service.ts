import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ILeccionRequest } from '../models/leccion.models';

@Injectable({
  providedIn: 'root'
})
export class LeccionService {

  constructor(private httpService: HttpService) { }

  public obtenerLeccion(req: ILeccionRequest){
    return this.httpService.get('/lecciones', req);
  }

  public obtenerTitulos(req: ILeccionRequest){
    return this.httpService.post('/titulos', req);
  }

  public obtenerContenidos(req: ILeccionRequest){
    return this.httpService.post('/contenidos', req);
  }

  public obtenerTemas(req: ILeccionRequest){
    return this.httpService.post('/temas', req);
  }

  public obtenerDescripciones(req: ILeccionRequest){
    return this.httpService.post('/descripciones', req);
  }

  public listarLecciones(){
    return this.httpService.post('/titulos');
  }
  
}
