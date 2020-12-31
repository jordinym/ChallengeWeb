import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFiltroFechasComponent } from './dialog-filtro-fechas.component';

describe('DialogFiltroFechasComponent', () => {
  let component: DialogFiltroFechasComponent;
  let fixture: ComponentFixture<DialogFiltroFechasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFiltroFechasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFiltroFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
