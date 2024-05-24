import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  constructor() { }

  private user = new BehaviorSubject<any>({});
  public currentUser = this.user.asObservable();

  public saveUser(user: any) {
    this.user.next(user);
  }

}
