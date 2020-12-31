import { Component, OnInit, OnDestroy } from '@angular/core';
// import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserData } from '../../../../core/data/users';
import { OpcionPerfil } from '../../../../core/data/opcion-perfil';
@Component({
  selector: 'ngx-opciones-perfil',
  templateUrl: './opciones-perfil.component.html',
  styleUrls: ['./opciones-perfil.component.scss'],
})
export class MenuListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private destroy$: Subject<void> = new Subject<void>();
  menuListado: OpcionPerfil[];

  constructor(
    private userService: UserData,
    ) {
      this.obtenerMenu();
    }

  ngOnInit() {

  }

  private obtenerMenu() {
    this.userService.getLoggedMenu()
      .pipe(takeUntil(this.destroy$))
      .subscribe((menu: any) => {
        this.menuListado = menu.filter(x => x.Visible == true);
      });
  }

  verOpcionesPerfil() {
    return false;
  }

}
