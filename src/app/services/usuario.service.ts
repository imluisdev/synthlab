import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ILoginRequest, ILogoutRequest, IRegistrarUsuario, IUsuarioRequest } from '../models/usuario.models';

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

  public cerrarSesion(req: ILogoutRequest){
    return this.httpService.post('/cerrar_sesion', req);
  }

  public getUsuarioInfo(req: IUsuarioRequest){
    return this.httpService.post('/usuario', req);
  }

}
