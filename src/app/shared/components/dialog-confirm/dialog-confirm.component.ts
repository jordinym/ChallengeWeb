import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent {
  @Input() mensaje="¿Desea aplicar la publicación?";
  @Input() textoAfirmacion="SI";
  @Input() textoNegacion="NO";
  @Input() onlyMeesage:boolean=false;
  constructor(protected dialogRef: NbDialogRef<DialogConfirmComponent>) { }

  cancel() {
    this.dialogRef.close(false);
  }

  submit() {
    this.dialogRef.close(true);
  }
}
