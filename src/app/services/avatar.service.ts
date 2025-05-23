import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IAgregarUsuarioAvatarRequest } from '../models/avatar.models';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private httpService: HttpService) { }

  public getAvatares(){
    return this.httpService.get('/avatars');
  }

  public agregarUsuarioAvatar(req: IAgregarUsuarioAvatarRequest){
    return this.httpService.post('/usuario-avatar/agregar', req);
  }

}
