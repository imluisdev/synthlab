import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ILoginGroup, IRegistrarUsuarioGroup } from '../../../../models/form.models';
import { IRegistrarUsuario } from '../../../../models/usuario.models';
import { UsuarioService } from '../../../../services/usuario.service';
import { finalize, take, timer } from 'rxjs';
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
  public iniciarSesionGroup: FormGroup<ILoginGroup>;
  public registrar: boolean = true;
  public login: boolean = false;
  public loading: boolean;
  public hiddenPassword: boolean = true;
  public hiddenConfirmationPassword: boolean = true;
  public hasCapitalLetter: boolean = false;
  public hasNumber: boolean = false;
  public hasSymbol: boolean = false;

  ngOnInit() {
    this.armarFormularioRegistro();
    this.armarFormularioLogin();
  }

  public hola(){
    this.hasCapitalLetter = /[A-Z]/.test(this.registrarUsuarioGroup.controls['contrasena'].value);
    this.hasNumber = /\d/.test(this.registrarUsuarioGroup.controls['contrasena'].value);
    this.hasSymbol = /[^a-zA-Z0-9]/.test(this.registrarUsuarioGroup.controls['contrasena'].value);
  }

  public iniciarSesion(e: any){
    e.preventDefault();
    if(this.iniciarSesionGroup.valid){
      Swal.fire({
        title: "<h1 class='font-bold'>Inicio de sesión exitoso!</h1>",
        html: `<h1 class='font-semibold mb-5'>Has iniciado sesión de manera correcta</h1>`,
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        didClose: () => this.router.navigate(['/dashboard'])
      });
    } else {
      Swal.fire({
        title: "<h1 class='font-bold'>Error en el inicio de sesión</h1>",
        html: `<h1 class='font-semibold mb-5'>Alguno de los datos es incorrecto</h1>`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  public toggleViewLogin(){
    this.login = true;
    this.registrar = false;
  }

  public toggleViewRegistro(){
    this.registrar = true;
    this.login = false;
  }

  public armarFormularioRegistro(){
    this.registrarUsuarioGroup = this.formulario.group({
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmar_contrasena: ['', [Validators.required, Validators.minLength(8)]],
      fecha_nacimiento: ['', Validators.required],
    });
  }

  public armarFormularioLogin(){
    this.iniciarSesionGroup = this.formulario.group({
      correo_electronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public registrarUsuario(){
    if(this.registrarUsuarioGroup.valid){
      const password = this.registrarUsuarioGroup.controls['contrasena'].value;
      const confirmationPassword = this.registrarUsuarioGroup.controls['confirmar_contrasena'].value;
      if(password == confirmationPassword){
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
          html: `<h1 class='font-semibold mb-5'>Las contraseñas proporcionadas no coinciden</h1>`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000
        });
      }
    } else {
      Swal.fire({
        title: "<h1 class='font-bold'>Error en el registro</h1>",
        html: `<h1 class='font-semibold mb-5'>Rellena todos los campos de manera correcta</h1>`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  public changePasswordVisibility(){
    if(this.hiddenPassword){
      this.hiddenPassword = !this.hiddenPassword;
      const timer$ = timer(1000);
      timer$.pipe(
        take(1)
      ).subscribe(() => {
        this.hiddenPassword = true;
      });
    }
  }

  public changeConfirmationPasswordVisibility(){
    if(this.hiddenConfirmationPassword){
      this.hiddenConfirmationPassword = !this.hiddenConfirmationPassword;
      const timer$ = timer(1000);
      timer$.pipe(
        take(1)
      ).subscribe(() => {
        this.hiddenConfirmationPassword = true;
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
          didClose: () => this.router.navigate(['/dashboard'])
        });
      } else {
        Swal.fire({
          title: "<h1 class='font-bold'>Error al realizar el registro</h1>",
          html: `<h1 class='font-semibold mb-5'>${ resp.message }</h1>`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

}
