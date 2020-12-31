import { Component, OnInit,Inject } from '@angular/core';
import { NbLogoutComponent, NbAuthService, NB_AUTH_OPTIONS, NbTokenService } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-logout',
  template: '<nb-logout></nb-logout>'
})
export class LogoutComponent extends NbLogoutComponent implements OnInit  {

  constructor(
    protected authService: NbAuthService,
    protected tokenService: NbTokenService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router) {
    super(authService, options, router);
  }

  ngOnInit() {
    this.authService.logout('email').subscribe(resp => {
      localStorage.clear();
      this.tokenService.clear();
      this.router.navigateByUrl('/auth/login');
    });
  }

} 