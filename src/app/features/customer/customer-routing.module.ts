import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { CustomerComponent } from './customer.component';
import { EvaluateChangeGuard } from './guards/evaluate-change.guard';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    data: {
          breadcrumb: 'Inicio',
          path:'home'
      },
    children: [
      {
        path: '',
        component: MainComponent,
        canDeactivate: [EvaluateChangeGuard],
        data: {
          breadcrumb: 'Customer',
          path:'customer'
      }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
