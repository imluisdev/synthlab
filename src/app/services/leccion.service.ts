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

  
}
