import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NbLoginComponent,NbAuthJWTToken, NbAuthService, NbAuthResult, NB_AUTH_OPTIONS } from '@nebular/auth';
import { getDeepFromObject } from '@nebular/auth';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../../../core/models/usuario.model';
import { Response } from '../../../../core/models/response.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ngx-base-auth',
  templateUrl: './base-auth.component.html',
  styleUrls: ['./base-auth.component.scss']
})
export class BaseAuthComponent extends NbLoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  loadingSociedad = false;
  user: any = {password:'',username:''};
  sociedades: any[] = [];
  error: string;
  warning: string;
  response: any = {};
  redirect: string = '';
  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    protected router: Router) {
    super(service, options, cd, router);
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.router.navigate(['/home']);
  }

  private setearUsuarioMenu(datos:any){
    // PerfilId guardara el perfil actual a nivel de sesion en el servicio
    const usuario:Usuario = {
      userId: datos.UserId.toUpperCase(),
      nombre: datos.Nombre.toUpperCase(),
      apellidoPaterno: datos.ApellidoPaterno.toUpperCase(),
      apellidoMaterno: datos.ApellidoMaterno.toUpperCase(),
      perfilDescripcion: datos.Role.map( x => x.Descripcion).join(','),
      sociedadId: datos.SociedadId,
      roles: datos.Role,
      userName: this.user.username,
      serviceOrganization: datos.ServiceOrganization,
      descServiceOrganization: datos.DscServiceOrganization
    };
    this.userService.setLoggedUser(usuario);
    this.userService.setLoggedMenu(datos.Menu);
  }

  login(): void {

    this.error = '';
    this.warning = '';
    this.response = {};
    if(this.user.username==undefined || this.user.username==null){
      this.warning ='No se permite usuario vacío.';
      return;
    }
    if(this.user.username.trim().length==0){
      this.warning ='No se permite usuario vacío.';
      return;
    }
    if(this.user.password==undefined || this.user.password==null){
      this.warning ='No se permite contraseña vacía.';
      return;
    }
    if(this.user.password.trim().length==0){
      this.warning ='No se permite contraseña vacía.';
      return;
    }
    this.submitted = true;
    this.loading = true;

    this.authService.login(this.user.username, this.user.password).pipe(first())
      .subscribe(
        data => {

          this.submitted = false;

          if (data.Status == "0") {
            this.userService.setToken(data.Data.Token);
            this.setearUsuarioMenu(data.Data);
            this.router.navigate(['/home']);
          }
          else if (data.Status == "4") {
            this.sociedades = data.Data;
            this.warning = data.Message;
          }
          else {
            this.error = data.Message;
          }
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
