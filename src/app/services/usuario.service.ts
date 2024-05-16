import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ILoginRequest, IRegistrarUsuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpService: HttpService) { }

  public registrarUsuario(req: IRegistrarUsuario){
    return this.httpService.post('/registrar_usuario', req);
  }

  public iniciarSesion(req: ILoginRequest){
    return this.httpService.post('/iniciar_sesion', req);
  }

}
