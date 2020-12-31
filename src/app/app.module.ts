import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from '@app/features/auth/auth.module';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NB_AUTH_TOKEN_INTERCEPTOR_FILTER, NbAuthJWTInterceptor } from '@nebular/auth';
import { AuthGuard } from './core/guards/auth.guard';
import { NbMenuModule, NbSidebarModule, NbDialogModule, NbToastrModule, NbWindowModule, NbDatepickerModule } from '@nebular/theme';
//isacc
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

// import { environment } from './environments/environment';
import { environment } from '../environments/environment';
import { AuthJWTInterceptor } from './core/interceptors/auth-jwt.interceptor';
import localeEsPE from '@angular/common/locales/es-PE';

registerLocaleData(localeEsPE, 'es-Pe');

import { EventEmitterService } from './event-emitter.service';
const NB_MODULES = [
  NbSidebarModule.forRoot(),
  NbMenuModule.forRoot(),
  NbDialogModule.forRoot(),
 NbDialogModule,
  NbWindowModule,

];

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...NB_MODULES,
    SharedModule,
    FeaturesModule.forRoot(),
    CoreModule.forRoot(),
    AuthModule,
    AppRoutingModule,
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    NbDatepickerModule.forRoot(),
        AngularFirestoreModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthJWTInterceptor , multi: true },
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: function () { return false; } },
    { provide: LOCALE_ID, useValue: 'es-Pe' },
    AuthGuard,
    EventEmitterService
  ],
})
export class AppModule { }
