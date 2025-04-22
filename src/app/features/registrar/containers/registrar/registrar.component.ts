import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ILoginGroup, IRegistrarUsuarioGroup } from '../../../../models/form.models';
import { IRegistrarUsuario, ILoginRequest } from '../../../../models/usuario.models';
import { UsuarioService } from '../../../../services/usuario.service';
import { finalize, map, switchMap, take, timer } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AvatarService } from '../../../../services/avatar.service';
import { IAgregarUsuarioAvatarRequest, IAvatar } from '../../../../models/avatar.models';
import { SharingService } from '../../../../services/sharing.service';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit {

  constructor(private formulario: NonNullableFormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private avatarService: AvatarService,
              private sharingService: SharingService) {}

  public registrarUsuarioGroup: FormGroup<IRegistrarUsuarioGroup>;
  public iniciarSesionGroup: FormGroup<ILoginGroup>;
  public registrar: boolean = false;
  public login: boolean = true;
  public loading: boolean;
  public loadingLogin: boolean;
  public hiddenPassword: boolean = true;
  public hiddenConfirmationPassword: boolean = true;
  public hasCapitalLetter: boolean = false;
  public hasNumber: boolean = false;
  public hasSymbol: boolean = false;
  public steps: number = 0;
  public avatares: Array<IAvatar>;
  public avatarSelected: IAvatar;

  ngOnInit() {
    this.armarFormularioRegistro();
    this.armarFormularioLogin();
    this.getAvataresDisponibles();
  }

  public checkCorrectPasswordFormat(){
    this.hasCapitalLetter = /[A-Z]/.test(this.registrarUsuarioGroup.controls['contrasena'].value);
    this.hasNumber = /\d/.test(this.registrarUsuarioGroup.controls['contrasena'].value);
    this.hasSymbol = /[^a-zA-Z0-9]/.test(this.registrarUsuarioGroup.controls['contrasena'].value);
  }

  public getAvataresDisponibles(){
    this.avatarService.getAvatares().subscribe((resp: any) => {
      if (Array.isArray(resp)) {
        this.avatares = this.createCheckedProperty(resp);
      }
    });
  }
  

  public createCheckedProperty(avatares: Array<IAvatar>){
    return avatares.map(avatar => {
      return { ...avatar, checked: false };
    })
  }

  public nextStepRegister(){
    if(this.steps == 0){
      if(this.validateFirstStep()){
        this.steps++;
      }
    } else if (this.steps == 1){
      if(this.validateSecondStep()){
        this.steps++;
      } else {
        Swal.fire({
          title: `<h1 class='font-bold'>Error en el inicio de sesión</h1>`,
          html: `<h1 class='font-semibold mb-5'>Las contraseñas proporcionadas no coinciden!</h1>`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000
        });
      }
    } else if (this.steps == 2) {
      if(this.validateThirdStep()){
        this.completeUserRegistration();
      }
    }
  }

  public completeUserRegistration(){
    const req: IRegistrarUsuario = {
      nombre: this.registrarUsuarioGroup.controls['nombre'].value,
      apellidoPaterno: this.registrarUsuarioGroup.controls['apellido_paterno'].value,
      apellidoMaterno: this.registrarUsuarioGroup.controls['apellido_materno'].value,
      correo: this.registrarUsuarioGroup.controls['correo_electronico'].value,
      password: this.registrarUsuarioGroup.controls['contrasena'].value,
      fechaNacimiento: this.registrarUsuarioGroup.controls['fecha_nacimiento'].value,
    };
    this.peticionRegistrarUsuarioYAvatar(req);
  }

  public selectAvatar(avatar: IAvatar){
    this.avatarSelected = avatar;
    avatar.checked = true;
    const idSelected = avatar.id;
    this.avatares.forEach(avatar => {
      if(avatar.id != idSelected){
        avatar.checked = false;
      }
    });
  }

  public validateFirstStep(){
    const nombre = this.registrarUsuarioGroup.controls['nombre'].valid;
    const apellido_paterno = this.registrarUsuarioGroup.controls['apellido_paterno'].valid;
    const apellido_materno = this.registrarUsuarioGroup.controls['apellido_materno'].valid;
    return (nombre && apellido_paterno && apellido_materno);
  }

  public validateSecondStep(){
    const correo = this.registrarUsuarioGroup.controls['correo_electronico'].valid;
    const password = this.registrarUsuarioGroup.controls['contrasena'].valid;
    const password_value = this.registrarUsuarioGroup.controls['contrasena'].value;
    const password_confirmation = this.registrarUsuarioGroup.controls['confirmar_contrasena'].valid;
    const password_confirmation_value = this.registrarUsuarioGroup.controls['confirmar_contrasena'].value;
    if(password_value != password_confirmation_value) return false;
    return (correo && password && password_confirmation);
  }

  public validateThirdStep(){
    const fecha_nacimiento = this.registrarUsuarioGroup.controls['fecha_nacimiento'].valid;
    return fecha_nacimiento && this.avatarSelected;
  }

  public iniciarSesion(e: any){
    e.preventDefault();
    this.loadingLogin = true;
    if(this.iniciarSesionGroup.valid){
      const reqLogin: ILoginRequest = {
        correo: this.iniciarSesionGroup.controls['correo_electronico'].value,
        password: this.iniciarSesionGroup.controls['contrasena'].value
      };
      this.usuarioService.iniciarSesion(reqLogin).pipe(
        finalize(() => this.loadingLogin = false)
      ).subscribe((resp: any) => {
        if(resp.token){
          Swal.fire({
            title: `<h1 class='font-bold'>Bienvenido a Synthlab!</h1>`,
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
            didClose: () => {
              window.location.href = `${ environment.mainUrl }/dashboard`;
              //window.location.href = `/dashboard`;
              // this.router.navigate(['/dashboard']);
              localStorage.setItem('token', resp.token);
              //this.sharingService.saveUser(resp.results);
            }
          });
        } else {
          Swal.fire({
            title: `<h1 class='font-bold'>Error en el inicio de sesión</h1>`,
            icon: "error",
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    } else {
      Swal.fire({
        title: `<h1 class='font-bold'>Error en el inicio de sesión</h1>`,
        html: `<h1 class='font-semibold mb-5'>Favor de llenar todos los campos necesarios!</h1>`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        didClose: () => this.loadingLogin = false
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
          apellidoPaterno: this.registrarUsuarioGroup.controls['apellido_paterno'].value,
          apellidoMaterno: this.registrarUsuarioGroup.controls['apellido_materno'].value,
          correo: this.registrarUsuarioGroup.controls['correo_electronico'].value,
          password: this.registrarUsuarioGroup.controls['contrasena'].value,
          fechaNacimiento: this.registrarUsuarioGroup.controls['fecha_nacimiento'].value,
        };
        this.peticionRegistrarUsuarioYAvatar(req);
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

  public peticionRegistrarUsuarioYAvatar(req: IRegistrarUsuario) {
    this.loading = true;
    this.usuarioService.registrarUsuario(req).pipe(
      switchMap((respUsuario: any) => {
        const req: IAgregarUsuarioAvatarRequest = {
          id_usuario: respUsuario.usuario_id,
          id_avatar: this.avatarSelected.id
        };
        // Enviar la solicitud con el cuerpo JSON
        return this.avatarService.agregarUsuarioAvatar(req).pipe(
          map(respAvatar => ({ respUsuario, respAvatar }))
        );
      })
    ).subscribe((resp: any) => {
      if (resp.respAvatar.avatar.id && resp.respUsuario.usuario_id) {
        Swal.fire({
          title: "<h1 class='font-bold'>Registro exitoso!</h1>",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          didClose: () => this.router.navigate(['/dashboard'])
        });
      } else {
        this.loading = false;
        Swal.fire({
          title: "<h1 class='font-bold'>Error al realizar el registro</h1>",
          icon: "error",
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }
  

}
