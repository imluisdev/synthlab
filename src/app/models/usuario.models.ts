export interface IRegistrarUsuario {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
    password: string;
    fechaNacimiento: string;
}

export interface ILoginRequest {
    correo_electronico: string;
    contrasena: string;
}

export interface ILogoutRequest {
    id_usuario: number;
}

export interface IUsuarioRequest {
    id_usuario: number;
}