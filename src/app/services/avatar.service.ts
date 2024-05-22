import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private httpService: HttpService) { }

  public getAvatares(){
    return this.httpService.post('/avatares');
  }

}
