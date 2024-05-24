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
  public idUsuario: number;

  ngOnInit(): void {
    this.idUsuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.getUserInfo();
  }

  public goToUserDetail(){
    this.router.navigate(['/me']);
  }

  public goToHome(){
    this.router.navigate(['/']);
  }

  public getUserInfo(){
    this.usuarioService.getUsuarioInfo({ id_usuario: this.idUsuario }).subscribe((resp: any) => {
      this.usuario = resp.results;
    });
  }

  public logout(){
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    const req: ILogoutRequest = {
      id_usuario: user.id_usuario
    };
    this.usuarioService.cerrarSesion(req).subscribe((resp: any) => {
      Swal.fire({
        title: `<h1 class='font-bold'>${ resp.message }</h1>`,
        html: `<h1 class='font-semibold mb-5'>Serás redirigido a la pagina principal de Synthlab!</h1>`,
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        didClose: () => {
          window.location.href = `${environment.mainUrl}`;
          this.router.navigate(['/']);
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
        }
      });
    });
  }

}
