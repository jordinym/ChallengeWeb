import { Injectable } from '@angular/core';
import { AppConstants } from '@app/app.constants';
import { ApiService } from '@app/core/services/api.service';
import { UserService } from '@app/features/auth/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Permiso } from '../models/permiso.model';

@Injectable({
    providedIn: 'root'
  })

  export class EvaluarPermisoService {
    constructor(private apiService: ApiService, private usuarioService: UserService, private toastr: ToastrService){}

  validarPermisos(modulo: string) {

      let permisos = new Permiso();
        this.usuarioService.getLoggedUser().subscribe((res: any) => {
            permisos.usuarioLogueado = res;
          });

          this.usuarioService.getLoggedMenu()
          .subscribe((menu: any) => {
            let rolesCoincidentes = menu.filter(x => x.Codigo.trim() == modulo);
            if(rolesCoincidentes.length > 0){
              permisos.permisoLectura = true;

              if(rolesCoincidentes[0].Habilitado == "1")
                permisos.permisoEscritura = true;
              else
                 permisos.permisoEscritura = false;
            }else{
              this.toastr.info(AppConstants.MensajeInformativo.SinPermiso, AppConstants.TitulosToastr.Info);
              //redireccionar al home
              // permisos.permisoEscritura = true;
              // permisos.permisoLectura = true;
            }
          });
        return permisos;
    }
  }
