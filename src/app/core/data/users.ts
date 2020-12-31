import { Observable } from 'rxjs';
import { OpcionPerfil } from './opcion-perfil';
import { Usuario } from '../models/usuario.model';

export abstract class UserData {
  // abstract currentUser: Usuario;

  // heradados
  abstract getLoggedUser(): Observable<Usuario> ;

  abstract setLoggedUser(usuario: Usuario) ;

  abstract setLoggedMenu(items: OpcionPerfil[]);

  abstract getLoggedMenu(): Observable<OpcionPerfil[]>;

  abstract getLogo();

  abstract setLogOut();

  abstract setToken(token:String);

  abstract isAuthenticate():boolean;
}
