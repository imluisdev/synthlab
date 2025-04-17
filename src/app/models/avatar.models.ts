export interface IAvatar {
    id: number;
    img: string;
    checked?: boolean;
}

export interface IAgregarUsuarioAvatarRequest {
    id_usuario: number;
    id_avatar: number;
}