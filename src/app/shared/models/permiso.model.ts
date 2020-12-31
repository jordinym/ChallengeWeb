import { Usuario } from '@app/core/models/usuario.model';

export class Permiso{
    usuarioLogueado: Usuario;
    permisoEscritura: boolean = false;
    permisoLectura: boolean = false;
}
