
import { Component, OnDestroy, OnInit,ViewChild} from '@angular/core';
import { NbMediaBreakpointsService,
         NbThemeService,
         NbMenuService,
         NbSidebarService,
         NbIconConfig,
  NbIconLibraries,
  NbPopoverDirective,
  NbDialogService
        } from '@nebular/theme';

import { UserData } from '../../core/data/users';
import { LayoutService } from '../../core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CodigoSociedad } from '../../core/data/codigo-sociedad';
import { AuthService } from '../../features/auth/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EventEmitterService } from '@app/event-emitter.service';
import { Location } from '@angular/common';
import { AppConstants } from '@app/app.constants';
import { DialogConfirmComponent } from '@app/shared/components/dialog-confirm/dialog-confirm.component';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})


export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: Usuario;
  listNotificaciones : Notification[];
  appLogo = '';
   cant: Number=0;
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
  ];

  currentTheme = 'default';

  iconoCerrarSesion: NbIconConfig = {
    icon: 'power-off',
    pack: 'font-awesome',
    status: 'info',
  };

  userMenu = [
    { title: 'Cerrar Sesion',
      icon:  this.iconoCerrarSesion,
      action: 'logout()',
    }];
    ref: AngularFirestoreCollection<Notification>;
    items:Observable<Notification[]>;
    itemsLeidos:Observable<Notification[]>;
  contadorNotifiacion: string;
  existeNotificacion: boolean = false;
  // FechaActual: Date;
  today= new Date();
  FechaCReacion:Number;
  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private iconLibraries: NbIconLibraries,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private eventEmitterService: EventEmitterService,
    private location: Location,
    private dialogService: NbDialogService,
              ) {
    this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa', packClass: 'fa' }); //


  }
  compartirInformacion:any={filtroBusqueda:{}};
  ngOnInit() {
    this.loadDataInit();
  }

  loadDataInit(){

    this.currentTheme = this.themeService.currentTheme;
    this.menuService.onItemClick().subscribe(( event ) => {
      this.onItemSelection(event.item); // title
    });

    this.userService.getLoggedUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: Usuario) => {
        this.user = user;
        this.appLogo = this.userService.getLogo();

       });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.notificaciones(this.user);
  }
  notificaciones(user) {
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  notificaciontodasLeidas() {


  }
  onItemSelection( item ) {
    if ( item.action === 'logout()' ) {
      let cerrar:boolean=false;
      if((AppConstants.RootCustomer ==this.location.path() )
        && this.layoutService.getCambiosPendientes()){

          this.dialogService
            .open(DialogConfirmComponent, {
              context: {
                mensaje:AppConstants.MensajeCambiosPendientes,
              },
            }).onClose.subscribe(flag => {
              if (flag) {
                  this.layoutService.setCambiosPendientes(false);
                this.logout();
              }else{
                return;
              }
            });
      }else{
        this.logout();
      }

    } else if ( item.title === 'Profile' ) {
        // Do something on Profile
        // console.log('Profile Clicked ');
    }
  }
  buscar($event){
    if($event.trim() != ""){
      this.eventEmitterService.onFirstComponentButtonClick($event.trim());
      this.compartirInformacion.filtro={
        filtroBusqueda: $event.trim()
      }
      this.router.navigateByUrl("home/busqueda", { state: { compartirInformacion: this.compartirInformacion  } });
    }
    else{
     this.toastr.warning("Debe ingresar un parametro para buscar","Advertencia");
    }
  }
  public notificacionLeida(notificacion: Notification) {

  }
  private logout() {
    this.changeTheme(CodigoSociedad.Challenge.tema);
    this.userService.setLogOut();
    this.router.navigate(['/auth']);
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  VerNotificaciones() {
    this.popover.hide();
    //this.router.navigate(['/home/notificaciones','experisoutsourcing39']);
    this.router.navigateByUrl("home/notificaciones");
  }

  convertDate(tick){
    let ticks = tick;
    //ticks are in nanotime; convert to microtime
    let ticksToMicrotime = ticks / 10000;
    //ticks are recorded from 1/1/1; get microtime difference from 1/1/1/ to 1/1/1970
    let epochMicrotimeDiff = Math.abs(new Date(0, 0, 1).setFullYear(1));
    //new date is ticks, converted to microtime, minus difference from epoch microtime
    let tickDate = new Date(ticksToMicrotime - epochMicrotimeDiff);
    tickDate.setMinutes(tickDate.getMinutes() - 9);

    return tickDate;
  }
}
