import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from '../../@core/data/users.service';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    ThemeModule,
  ],
  declarations: [
    UserListComponent,
  ],
  providers: [
    UserService,
  ],
})
export class UsersModule { }
