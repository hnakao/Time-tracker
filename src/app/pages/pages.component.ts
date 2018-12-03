import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { User } from './../@core/models/user';
import { Response } from './../@core/models/response';
import { UserService } from './../@core/data/users.service';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

 // menu: NbMenuItem[] = [];
  menu = MENU_ITEMS;
  role: string;


  constructor(private userService: UserService) {
/*     this.userService.getUsers().subscribe((users: Response<User[]>) => {
      this.role = this.userService.getDecodedAccessToken().roleId;
      console.log(this.role);
      if (this.role === 'Admin') {
        const menuPage = MENU_ITEMS;
        menuPage[1].home = false;
        menuPage[1].children[0].home = false;
        this.menu = menuPage;
      } else {
        const item = MENU_ITEMS[2];
        item.home = true;
        this.menu = [...this.menu, item];
      }
    }); */
  }



}
