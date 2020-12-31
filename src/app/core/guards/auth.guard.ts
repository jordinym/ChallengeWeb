import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { AppConstants } from '@app/app.constants';
import { UserService } from '@app/features/auth/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: UserService, private router: Router) {
  }

  canActivate() {
    if(!this.authService.isAuthenticate()){
      localStorage.removeItem(AppConstants.LocalStorage.Usuario);
      localStorage.removeItem(AppConstants.LocalStorage.Menu);
      localStorage.removeItem(AppConstants.LocalStorage.NebularToken);
      this.router.navigate(['/auth']);
      return false;
    }
    return  true;
  }
}


