import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from '@app/app.constants';

@Component({
  selector: 'ngx-dialog-filtro-fechas',
  templateUrl: './dialog-filtro-fechas.component.html',
  styleUrls: ['./dialog-filtro-fechas.component.scss']
})
export class DialogFiltroFechasComponent implements OnInit {
  @Input() fechaInicio: Date = null;
  @Input() fechaFin: Date = null;

  constructor(protected ref: NbDialogRef<DialogFiltroFechasComponent>, private toastr: ToastrService) {}

  ngOnInit(): void {}

  close(){
    let resp: any = { flag: false };
    this.ref.close(resp);
  }

  submit(){
    if(this.fechaInicio != null && this.fechaFin != null){
      let resp: any = { flag: true, fechaInicio: this.fechaInicio, fechaFin: this.fechaFin };
      this.ref.close(resp);
    }else{
      this.toastr.warning("Debe ingresar fecha inicio y fecha fin",AppConstants.TitulosToastr.Warning);
    }

  }
}
