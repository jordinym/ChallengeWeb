import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'ngx-main',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
listado: any[];
existenCambiosPendientes: boolean = false;
ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}

private destroy$: Subject<void> = new Subject<void>();

constructor(
  ) {
   }

ngOnInit() {
}
}
