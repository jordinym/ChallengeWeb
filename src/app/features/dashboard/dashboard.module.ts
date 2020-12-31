import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbThemeModule, NbSpinnerModule, NbPopoverModule } from '@nebular/theme';
import { DEFAULT_THEME } from '@assets/theme.default';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './services/dashboard.service';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './dashboard.component';
import { MenuListComponent } from './components/opciones-perfil/opciones-perfil.component';

import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from '@app/shared/pipes';
import { FormsModule } from '@angular/forms';

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

const COMPONENTS = [
  MainComponent,
  DashboardComponent,
  MenuListComponent
];

const SERVICES = [
  DashboardService,
];

@NgModule({
  imports: [
    DashboardRoutingModule,
    HttpClientModule,
    NgxEchartsModule,
    NbSpinnerModule,
    NbPopoverModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES,
  ],

  providers: [
    ...SERVICES
  ],
  entryComponents: [
  ],
})
export class DashboardModule {
  static forRoot(): ModuleWithProviders<DashboardModule>  {
    return {
      ngModule: DashboardModule,
      providers: [
        ...SERVICES,
        ...NbThemeModule.forRoot(
          {
            name: 'default', // cosmic
          },
          [DEFAULT_THEME,
          ],
        ).providers,
      ],
    };
  }
}


