import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AppConstants } from '@app/app.constants';
import { LayoutService } from '@app/core/utils';
import { DialogConfirmComponent } from '@app/shared/components/dialog-confirm/dialog-confirm.component';
import { NbDialogService } from '@nebular/theme';
import { RegisterComponent } from '../components/register/register.component';

@Injectable()
export class EvaluateChangeGuard implements CanDeactivate<RegisterComponent>
{

  constructor(
    private dialogService: NbDialogService,
    private layoutService: LayoutService
  ) {}
    canDeactivate(target: RegisterComponent) {

        if (target.existenCambiosPendientes && this.layoutService.getCambiosPendientes()) {
      var modal=    this.dialogService
      .open(DialogConfirmComponent, {
        context: {
          mensaje:AppConstants.MensajeCambiosPendientes,
        },
      });

      return modal.onClose;
    }
        return true;

    }
}
