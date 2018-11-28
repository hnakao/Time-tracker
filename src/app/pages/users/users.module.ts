
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { RoleActionsComponent } from './role-actions.component';
import { UserRoleService } from './../../@core/data/user-role.service';
import { RoleInfoComponent } from './role-info/role-info.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { UserRoleComponent } from './user-role/user-role.component';

import { UserService } from './../../@core/data/users.service';
import { UserActionsComponent } from './user-actions.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';

import { TokenInterceptor } from '../../@core/utils/token.interceptor';



@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    NgMultiSelectDropDownModule,

  ],
  declarations: [
    UserActionsComponent,
    AddUserComponent,
    UserListComponent,
    UserRoleComponent,
    RoleActionsComponent,
    AddRoleComponent,
    RoleInfoComponent,
  ],
  entryComponents: [
    UserActionsComponent,
    RoleInfoComponent,
    RoleActionsComponent,
    AddUserComponent,
    AddRoleComponent,
  ],
  providers: [
    UserRoleService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    /*{ provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},*/
  ],
})
export class UsersModule { }
