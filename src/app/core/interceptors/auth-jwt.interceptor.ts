import { Injectable, Injector } from '@angular/core';
import { NbAuthService, NbAuthJWTInterceptor, NbAuthJWTToken } from '@nebular/auth';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppConstants } from '@app/app.constants';
import { UserService } from '@app/features/auth/services/user.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthJWTInterceptor implements HttpInterceptor {

    private authService: UserService;
    private tokenService: NbAuthJWTToken;

    constructor(private injector: Injector, private router: Router) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService = this.injector.get(UserService); // get it here within intercept

            if (this.authService.isAuthenticate()) {

                let authAppToken: { value: '' };
                authAppToken = JSON.parse(localStorage.getItem(AppConstants.LocalStorage.NebularToken));

                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${authAppToken.value}`
                    }
                });
            } else {
                localStorage.removeItem(AppConstants.LocalStorage.Usuario);
                localStorage.removeItem(AppConstants.LocalStorage.Menu);
                localStorage.removeItem(AppConstants.LocalStorage.NebularToken);
                this.router.navigate(['/auth']);
            }

        return next.handle(request).pipe(tap(() => { },
        (err: any) => {

            if (err instanceof HttpErrorResponse) {
                 if (err.status !== 401) {
                     return;
                 }
                 localStorage.removeItem(AppConstants.LocalStorage.Usuario);
                 localStorage.removeItem(AppConstants.LocalStorage.Menu);
                 localStorage.removeItem(AppConstants.LocalStorage.NebularToken);
                 this.router.navigate(['/auth']);

            }
        }));
    }

}
