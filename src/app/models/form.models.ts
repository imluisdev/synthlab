import { FormControl } from "@angular/forms";

export interface IRegistrarUsuarioGroup {
    nombre: FormControl<string>;
    apellido_paterno: FormControl<string>;
    apellido_materno: FormControl<string>;
    correo_electronico: FormControl<string>;
    contrasena: FormControl<string>;
    confirmar_contrasena: FormControl<string>;
    fecha_nacimiento: FormControl<string>;
}

export interface ILoginGroup {
    correo_electronico: FormControl<string>;
    contrasena: FormControl<string>;
}