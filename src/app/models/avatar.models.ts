export interface IAvatar {
    id: number;
    id_recurso: number;
    path: string;
    checked?: boolean;
}

export interface IAgregarUsuarioAvatarRequest {
    id_usuario: number;
    id_avatar: number;
}