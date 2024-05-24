import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    Swal.fire({
      title: `<h1 class='font-bold'>Tu sesión ha expirado</h1>`,
      html: `<h1 class='font-semibold mb-5'>Serás redirigido a la pagina principal</h1>`,
      icon: "warning",
      showConfirmButton: false,
      timer: 2000,
      didClose: () => this.router.navigate(['/'])
    });
  }

  public getSession(): Observable<boolean> {
    if(!this.existeSesion()){
      return of(false);
    }

    const sesion = this.getCurrentSesion();

    const jwtHelper = new JwtHelperService();
    if(jwtHelper.isTokenExpired(sesion.token)){
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      return of(false);
    }

    if(sesion.token) localStorage.setItem('usuario', JSON.stringify(jwtHelper.decodeToken(sesion.token)));
    return of(true);

  }

  public existeSesion(){
    const token = localStorage.getItem('token');
    if(token) {
      return true;
    }
    return false;
  }

  public getCurrentSesion(){
    const token = localStorage.getItem('token');
    return { token };
  }

}
