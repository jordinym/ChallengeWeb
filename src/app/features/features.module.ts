import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbUserModule, NbPopoverModule, NbMenuModule,
  NbSidebarModule, NbDialogModule, NbToastrModule,
  NbWindowModule, NbDatepickerModule, NbButtonModule,
  NbInputModule, NbCardModule, NbCheckboxModule,
  NbSelectModule, NbTabsetModule, NbTooltipModule, NbListModule, NbDialogRef,
} from '@nebular/theme';
import { DashboardModule } from './dashboard/dashboard.module';
import { FeaturesComponent } from './features.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { HeaderComponent } from '@app/core/header/header.component';
import { BreadcrumbComponent } from '@app/core//breadcrumb/breadcrumb.component';
import { DialogConfirmComponent } from '@app/shared/components/dialog-confirm/dialog-confirm.component';

import { FormsModule } from '@angular/forms';


const COMPONENTS = [
  FeaturesComponent,
  BreadcrumbComponent,
  HeaderComponent
];

export const NB_CORE_PROVIDERS = [
  ...DashboardModule.forRoot().providers,
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    FeaturesRoutingModule,
    DashboardModule,
    FormsModule,
    SharedModule,
    NbCardModule,
    NbCheckboxModule,
    NbTabsetModule,
    NbPopoverModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbTooltipModule,
    NbListModule,
  ],
  providers: [
    {
      provide: NbDialogRef,
      useValue: {}
    },

  ],
  entryComponents: [DialogConfirmComponent]
})

export class FeaturesModule {
  static forRoot(): ModuleWithProviders<FeaturesModule> {
    return {
      ngModule: FeaturesModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
