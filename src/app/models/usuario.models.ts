export interface IRegistrarUsuario {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
    password: string;
    fechaNacimiento: string;
}

export interface ILoginRequest {
    correo: string;
    password: string;
}

export interface ILogoutRequest {
    id_usuario: number;
}

export interface IUsuarioRequest {
    correo: number;
}