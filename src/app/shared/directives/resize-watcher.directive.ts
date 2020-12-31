import { Directive, AfterContentChecked, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { LayoutService } from '@app/core/utils';
import { takeWhile } from 'rxjs/operators';

@Directive({ selector: '[ngx-resize-watcher]' })
export class NgxResizeWatcherDirective implements OnDestroy {
    private alive = true;
    private latestWidth: number;
    constructor(private table: DatatableComponent,
        public layoutService: LayoutService,
        public ref: ChangeDetectorRef) {

        this.layoutService.onSafeChangeLayoutSize()
            .pipe(
                takeWhile(() => this.alive),
            )
            .subscribe(() => this.resizeTable());
    }
    ngOnDestroy(): void {
        this.alive = false;
    }

    resizeTable() {
        if (this.table && this.table.element.clientWidth !== this.latestWidth) {
            this.latestWidth = this.table.element.clientWidth;
            this.table.recalculate();
            this.ref.detectChanges();
        }
    }

}