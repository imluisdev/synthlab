import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ILoginRequest, ILogoutRequest, IRegistrarUsuario, IUsuarioRequest } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpService: HttpService) { }

  public registrarUsuario(req: IRegistrarUsuario){
    return this.httpService.post('/auth/register', req);
  }

  public iniciarSesion(req: ILoginRequest){
    return this.httpService.post('/auth/login', req);
  }

  public cerrarSesion(req: ILogoutRequest){
    return this.httpService.post('/cerrar_sesion', req);
  }

  public getUsuarioInfo(req: IUsuarioRequest){
    return this.httpService.post('/user', req);
  }

}
