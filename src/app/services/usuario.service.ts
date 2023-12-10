import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IRegistrarUsuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpService: HttpService) { }

  public registrarUsuario(req: IRegistrarUsuario){
    return this.httpService.post('/registrar_usuario', req);
  }

}
