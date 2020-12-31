import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-dashboard',
  template: '<router-outlet class="mw-100 w-100 pl-1 pt-0"></router-outlet>'
})
export class DashboardComponent {

  menu = MENU_ITEMS;

}
