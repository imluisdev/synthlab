export interface IRegistrarUsuario {
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo_electronico: string;
    contrasena: string;
    fecha_nacimiento: string;
}

export interface ILoginRequest {
    correo_electronico: string;
    contrasena: string;
}