import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  LayoutService,
  StateService,
} from './utils';
import { UserData } from './data/users';
import { UserService } from '../features/auth/services/user.service';
import { DashboardService } from '../features/dashboard/services/dashboard.service';
import { ApiService } from './services/api.service';
import {
  NbActionsModule,
  NbUserModule, NbPopoverModule, NbMenuModule,
  NbSidebarModule, NbDialogModule, NbToastrModule,
  NbWindowModule, NbDatepickerModule, NbButtonModule,
  NbInputModule, NbCardModule, NbCheckboxModule,
  NbSelectModule, NbTabsetModule, NbTooltipModule,
} from '@nebular/theme';


const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
    ApiService,
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  LayoutService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
    NbActionsModule,
    NbUserModule,
    NbPopoverModule,
    NbMenuModule,
    NbSidebarModule,
    NbDialogModule,
    NbToastrModule,
    NbWindowModule,
    NbDatepickerModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbCheckboxModule,
    NbSelectModule,
    NbTabsetModule,
    NbTooltipModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return  {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
