import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { IUsuarioRequest } from '../../../../models/usuario.models';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent implements OnInit {

  public idUsuario: any;
  public usuario: any;

  constructor(private usuarioService: UsuarioService){}

  ngOnInit(): void {
    this.idUsuario = JSON.parse(localStorage.getItem('usuario') || '{}').id_usuario;
    this.getUsuarioInfo();
  }

  public getUsuarioInfo(){
    const reqUsuario: IUsuarioRequest = {
      id_usuario: this.idUsuario
    };
    this.usuarioService.getUsuarioInfo(reqUsuario).subscribe((resp: any) => {
      if(resp.status){
        this.usuario = resp.results;
      }
    });
  }

}
