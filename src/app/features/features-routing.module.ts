import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { FeaturesModule } from './features.module';
const routes: Routes = [

  {
  path: '',
  component: FeaturesComponent,
  children: [
    {
        path: 'home',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
    },
    {
      path: 'home/customer',
      loadChildren: () =>
        import('./customer/customer.module').then(
          (m) => m.CustomerModule
        ),
      canActivate: [AuthGuard],
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
