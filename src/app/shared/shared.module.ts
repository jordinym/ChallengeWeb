import { NgModule, ModuleWithProviders, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbTabsetModule,
  NbMenuModule,
  NbAlertModule,
  NbActionsModule,
  NbLayoutModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbDatepickerModule,
  // NbDialogModule,
  NbWindowModule,
  NbToastrModule,
  NbChatModule,
  NbAccordionModule,
  NbInputModule,
  NbSpinnerModule,
  NbCardModule,
  NbPopoverModule,
  NbRadioModule,
  NbCheckboxModule,
  NbTooltipModule,
  NbAutocompleteModule
} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DEFAULT_THEME } from '@assets/theme.default';
import { NbThemeModule } from '@nebular/theme';
import { NbSecurityModule } from '@nebular/security';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { MentionModule } from 'angular-mentions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { ToastrModule } from 'ngx-toastr';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { DialogFiltroFechasComponent } from './components/dialog-filtro-fechas/dialog-filtro-fechas.component';
import { DisableFormComponent } from './components/disable-form/disable-form.component';
const NB_MODULES = [
  FormsModule,
  CommonModule,
  NbLayoutModule,
  NbAlertModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbWindowModule,
  NbToastrModule,
  NbChatModule,
  NbAccordionModule,
  NbInputModule,
  NbSpinnerModule,
  NbCardModule,
  NbPopoverModule,
  NbRadioModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbTooltipModule,
  NbAutocompleteModule,
  NbDateFnsDateModule
];

const ST_MODULES = [
  DialogConfirmComponent,
];

@NgModule({
  declarations: [
    DialogConfirmComponent,
    FormatDatePipe,
    DialogFiltroFechasComponent,
    DisableFormComponent
  ],
  imports: [
    CommonModule,
    NbIconModule,
    NbEvaIconsModule,
    NbCardModule,
    NgxDatatableModule,
    NbSelectModule,
    FormsModule,
    MentionModule,
    NbTabsetModule,
    NbTooltipModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
    }),
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forChild({ format: 'dd/MM/yyyy' })
  ],
  exports: [
    ...NB_MODULES,
    ...ST_MODULES,
    NgxDatatableModule,
    NgbModule,
    FormatDatePipe,
    DisableFormComponent
  ],
  entryComponents: [DialogConfirmComponent, DialogFiltroFechasComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        NgxDatatableModule,
        ...NbThemeModule.forRoot(
          {
            name: 'default', // cosmic
          },
          [DEFAULT_THEME,
          ],
        ).providers
      ],
    };
  }
}
