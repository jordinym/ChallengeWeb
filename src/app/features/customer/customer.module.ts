import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NbDialogModule } from '@nebular/theme';
import { DialogConfirmComponent } from '@app/shared/components/dialog-confirm/dialog-confirm.component';
import { RegisterComponent } from './components/register/register.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { EvaluateChangeGuard } from './guards/evaluate-change.guard';

@NgModule({
    declarations: [RegisterComponent, MainComponent,CustomerComponent ],
    imports: [
      CommonModule,
      SharedModule,
      CustomerRoutingModule,
      FormsModule,
      NbDialogModule.forRoot(),
    ],
    entryComponents:[DialogConfirmComponent],
    providers:[EvaluateChangeGuard ]
  })

export class CustomerModule { }
