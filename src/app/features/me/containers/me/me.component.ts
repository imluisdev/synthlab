import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { IUsuarioRequest } from '../../../../models/usuario.models';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent implements OnInit {

  public correo: any;
  public usuario: any;

  constructor(private usuarioService: UsuarioService){}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.correo = usuario.sub || null;
    this.getUsuarioInfo();
  }

  public getUsuarioInfo(){
    const reqUsuario: IUsuarioRequest = {
      correo: this.correo
    };
    const token = localStorage.getItem('token');
    this.usuarioService.getUsuarioInfo({ correo: this.correo }, token)
      .subscribe((resp: any) => {
        this.usuario = resp;
      });
  }

}
