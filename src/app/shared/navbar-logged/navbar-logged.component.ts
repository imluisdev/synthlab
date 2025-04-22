import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ILogoutRequest } from '../../models/usuario.models';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-navbar-logged',
  templateUrl: './navbar-logged.component.html',
  styleUrl: './navbar-logged.component.css'
})
export class NavbarLoggedComponent implements OnInit {

  constructor(private router: Router, private usuarioService: UsuarioService){}
  
  public usuario: any;
  public correo: number;

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.correo = usuario.sub || null;
    this.getUserInfo();
  }

  public goToUserDetail(){
    this.router.navigate(['/me']);
  }

  public goToHome(){
    this.router.navigate(['/']);
  }

  public getUserInfo() {
    const token = localStorage.getItem('token');
  
    this.usuarioService.getUsuarioInfo({ correo: this.correo }, token)
      .subscribe((resp: any) => {
        this.usuario = resp;
      });
  }

  public logout(){
    Swal.fire({
      title: `<h1 class='font-bold'>¡Sesión cerrada!</h1>`,
      html: `<h1 class='font-semibold mb-5'>Serás redirigido a la página principal de Synthlab.</h1>`,
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      didClose: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = `${environment.mainUrl}`;
        this.router.navigate(['/']);
      }
    });
  }  

}
