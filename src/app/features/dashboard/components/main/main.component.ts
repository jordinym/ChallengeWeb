import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
listado: any[];

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
