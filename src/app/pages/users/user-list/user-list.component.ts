import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';



import { UserActionsComponent } from '../user-actions.component';
import { AddUserComponent } from '../add-user/add-user.component';

import { UserService } from '../../../@core/data/users.service';
import { User } from '../../../@core/models/user';
import { Response } from './../../../@core/models/response';
import { UserRoleService } from '../../../@core/data/user-role.service';
import { Role } from '../../../@core/models/role';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class UserListComponent implements OnInit {

  private roles: Role[];

  settings = {
    hideSubHeader: true,
    actions: false,

    columns: {
      firstName: {
        title: 'Name',
        type: 'string',
        filter: true,
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
        filter: true,
      },
      roleId: {
        title: 'Role',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value && this.roles) {
              for (const role of this.roles) {
                if (role.id === value)
                  return `<div class = "row">
                            <div class = "container">
                              ${role.roleName}
                            </div>
                          </div>`;
              }
          }
              return `<div class = "row">
                        <div class = "container">
                          No Role Assigned
                        </div>
                      </div>`;
          },
        filter: true,
      },
      email: {
        title: 'e-Mail',
        type: 'string',
        filter: true,
      },
      id: {
        title: 'Actions',
        type: 'custom',
        filter: false,
        renderComponent: UserActionsComponent,
        onComponentInitFunction: (instance) => {
          instance.edit.subscribe(row => {
            this.editUser(row);
          });
          instance.delete.subscribe(row => {
            if (window.confirm('Are you sure you want to delete?')) {
               this.service.deleteUser(row.id).subscribe( data => {
                this.getTableData();
              });
            }
          });
        },
        width: '8%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  @Output() usertSelected = new EventEmitter();


  constructor(private service: UserService,
              private modalService: NgbModal,
              private roleService: UserRoleService) { }

  openAddUserModal() {
    const modal: NgbModalRef = this.modalService.open(AddUserComponent, { size: 'sm', container: 'nb-layout' });
    (<AddUserComponent>modal.componentInstance).titleForm = 'New User';
    (<AddUserComponent>modal.componentInstance).save.subscribe(data => {
     this.getTableData();
   });
  }

  editUser(user) {
    const modal: NgbModalRef = this.modalService.open(AddUserComponent, { size: 'sm', container: 'nb-layout' });
    (<AddUserComponent>modal.componentInstance).user = user;
    (<AddUserComponent>modal.componentInstance).titleForm = 'Edit User';
    (<AddUserComponent>modal.componentInstance).save.subscribe(data => {
      this.getTableData();
    });
  }

  ngOnInit() {
    this.roleService.getRoles().subscribe((roles: Response<Role[]>) => {
        this.roles = roles.data;
    });
    this.getTableData();
  }

  getTableData() {
    this.service.getUsers()
    .subscribe((users: Response<User[]>) => {
      // quit--
      const user2: User[] = [];
      for (const user of users.data) {
        if (!user.isDeleted)
        user2.push(user);
      }
      // ---
      this.source.load(user2);
    });
  }

}
