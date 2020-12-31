import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Usuario } from '../../../core/models/usuario.model';
import { UserData } from '../../../core/data/users';
import { CodigoSociedad } from '../../../core/data/codigo-sociedad';
import { AppConstants } from '@app/app.constants';
import { OpcionPerfil } from '../../../core/data/opcion-perfil';
import { map } from 'rxjs/operators';
import { ApiService } from '@app/core/services/api.service';
import { NbToastrService } from '@nebular/theme';
@Injectable({
  providedIn: 'root',
})
export class UserService extends UserData {
  isAuthenticate(): boolean {
    let authAppToken: { value: '' };
    authAppToken = JSON.parse(localStorage.getItem(AppConstants.LocalStorage.NebularToken));
    if (authAppToken == null || authAppToken == undefined) {
      return false;
    } else {
      if (authAppToken.value.length == 0) {
        return false;
      } else {
        return true;
      }
    }

  }

  constructor(private apiService: ApiService, private toastr: NbToastrService) {
    super();
  }

  private getUserFromLocalStorage(): Usuario {
    return JSON.parse(localStorage.getItem(AppConstants.LocalStorage.Usuario));
  }

  getLoggedUser(): Observable<Usuario> {
    return observableOf(this.getUserFromLocalStorage());
  }

  setLoggedUser(usuario: Usuario) {
    usuario.logo = `logo${usuario.sociedadId}.png`;
    localStorage.setItem(AppConstants.LocalStorage.Usuario, JSON.stringify(usuario));
  }

  setLoggedMenu(items: OpcionPerfil[]) {
    localStorage.setItem(AppConstants.LocalStorage.Menu, JSON.stringify(items));
  }
  getLoggedMenu(): Observable<OpcionPerfil[]> {
    const items = localStorage.getItem(AppConstants.LocalStorage.Menu);
    return observableOf(JSON.parse(items));
  }

  setLogOut() {
    localStorage.removeItem(AppConstants.LocalStorage.Usuario);
    localStorage.removeItem(AppConstants.LocalStorage.Menu);
    localStorage.removeItem(AppConstants.LocalStorage.NebularToken);
    this.setCleanList();
  }


  setToken(token: string) {
    let authAppToken: {};
    authAppToken = JSON.parse(localStorage.getItem(AppConstants.LocalStorage.NebularToken));
    if (authAppToken == null || authAppToken == undefined) {
      authAppToken = {
        createdAt: Date.now(),
        name: "nb:auth:jwt:token",
        ownerStrategyName: "email",
        value: token
      };
    }
    localStorage.setItem(AppConstants.LocalStorage.NebularToken, JSON.stringify(authAppToken));
  }

  getLogo(): string {
    return this.getUserFromLocalStorage().logo;
  }



  setCleanList() {
  }
}
