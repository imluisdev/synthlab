import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { IRegistrarUsuarioGroup } from '../../../../models/form.models';
import { IRegistrarUsuario } from '../../../../models/usuario.models';
import { UsuarioService } from '../../../../services/usuario.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit {

  constructor(private formulario: NonNullableFormBuilder, private usuarioService: UsuarioService, private router: Router) {}

  public registrarUsuarioGroup: FormGroup<IRegistrarUsuarioGroup>;
  public loading: boolean;

  ngOnInit() {
    this.armarFormularioRegistro();
  }

  public armarFormularioRegistro(){
    this.registrarUsuarioGroup = this.formulario.group({
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      correo_electronico: ['', Validators.required],
      contrasena: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
    });
  }

  public registrarUsuario(){
    if(this.registrarUsuarioGroup.valid){
      const req: IRegistrarUsuario = {
        nombre: this.registrarUsuarioGroup.controls['nombre'].value,
        apellido_paterno: this.registrarUsuarioGroup.controls['apellido_paterno'].value,
        apellido_materno: this.registrarUsuarioGroup.controls['apellido_materno'].value,
        correo_electronico: this.registrarUsuarioGroup.controls['correo_electronico'].value,
        contrasena: this.registrarUsuarioGroup.controls['contrasena'].value,
        fecha_nacimiento: this.registrarUsuarioGroup.controls['fecha_nacimiento'].value,
      };
      this.peticionRegistrarUsuario(req);
    } else {
      Swal.fire({
        title: "<h1 class='font-bold'>Error en el registro</h1>",
        html: `<h1 class='font-semibold mb-5'>Es necesario rellenar todos los campos</h1>`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  public peticionRegistrarUsuario(req: IRegistrarUsuario){
    this.loading = true;
    this.registrarUsuarioGroup.disable();
    this.usuarioService.registrarUsuario(req).pipe(
      finalize(() => {
        this.loading = false;
        this.registrarUsuarioGroup.enable();
      })
    ).subscribe((resp: any) => {
      if(resp.status){
        Swal.fire({
          title: "<h1 class='font-bold'>Registro exitoso!</h1>",
          html: `<h1 class='font-semibold mb-5'>${ resp.message }</h1>`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          didClose: () => this.router.navigate(['/'])
        });
      }
    });
  }

}
