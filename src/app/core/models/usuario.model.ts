import { Rol } from './rol.model'
import { Menu } from './menu.model'

export class Usuario {
    userId:string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    token?: string;
    menus?: Menu[];
    logo?: string;
    perfilDescripcion: string;
    sociedadId: string;
    roles?: Rol[];
    cargo?: string;
    correo?: string;
    sociedad?: string; // descripcion
    userName: string;
    serviceOrganization: string;
    descServiceOrganization: string;
}
