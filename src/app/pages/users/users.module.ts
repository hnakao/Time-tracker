
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { UserActionsComponent } from './user-actions.component';
import { AddUserComponent } from './add-user/add-user.component';

import { UserService } from '../../@core/data/users.service';
import { TokenInterceptor } from '../../@core/utils/token.interceptor';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,

  ],
  declarations: [
    UserActionsComponent,
    AddUserComponent,
    UserListComponent,
  ],
  entryComponents: [
    UserActionsComponent,
    AddUserComponent,
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }, /*
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},*/
  ],
})
export class UsersModule { }
