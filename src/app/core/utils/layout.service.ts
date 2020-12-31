import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay, share, shareReplay, debounceTime } from 'rxjs/operators';

@Injectable()
export class LayoutService {
  private chambiosPendientes = new BehaviorSubject(false);
  protected layoutSize$ = new Subject();
  protected layoutSizeChange$ = this.layoutSize$.pipe(

    shareReplay({ refCount: true }),
  );
  changeLayoutSize() {
    this.layoutSize$.next();
  }

  onChangeLayoutSize(): Observable<any> {
    return this.layoutSize$.pipe(
      share(),
      // delay(1),
    );
  }
  setCambiosPendientes(habilitar:boolean) {
    this.chambiosPendientes.next(habilitar);
  }
  getCambiosPendientes():boolean {
    return this.chambiosPendientes.getValue();
  }

  onSafeChangeLayoutSize(): Observable<any> {
    return this.layoutSizeChange$.pipe(
      debounceTime(10),
    );
  }

}
