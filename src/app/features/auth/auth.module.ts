import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

import { BaseAuthComponent } from './components/base-auth/base-auth.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

import { NbPasswordAuthStrategy, NbAuthModule,NbAuthJWTToken } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbCardModule
} from '@nebular/theme';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

@NgModule({
  declarations: [AuthComponent, BaseAuthComponent, LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbCardModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,
    ShowHidePasswordModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'Data.Token',
          },
          baseEndpoint: environment.apiBaseServiceUrl,
          login: {
            endpoint: '/Auth/Autenticar',
            method: 'post',
            redirect: {
              success: '/home',
              failure: null,
            },
            defaultErrors: ['Usuario y/o contraseña incorrectos. Intente nuevamente.'],
            defaultMessages: ['Has ingresado exitosamente.'],
          },
          logout: {
            endpoint: '/api/Login/Salir',
            method: 'post',
            redirect: {
                success: '/auth/login',
                failure: null,
            },
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          rememberMe: false,
          showMessages: {
            success: true,
            error: true,
          },
        },
        logout: {
          redirectDelay: 0,
          strategy: 'email',
        },
      },
    }),
  ]
})
export class AuthModule { }
