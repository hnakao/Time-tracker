import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { UserActionsComponent } from '../user-actions.component';
import { AddUserComponent } from '../add-user/add-user.component';

import { UserService } from '../../../@core/data/users.service';
import { UserT } from '../../../@core/models/userT';

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
  settings = {
    hideSubHeader: true,
    actions: false,

    columns: {
      userName: {
        title: 'Name',
        type: 'string',
        filter: false,
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
        filter: false,
      },
      rol: {
        title: 'Rol',
        type: 'string',
        filter: false,
      },
      email: {
        title: 'e-Mail',
        type: 'string',
        filter: false,
      },
      _id: {
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
              this.service.deleteUserT(row.userName).subscribe( data => {
                this.source.load(data);

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
              private modalService: NgbModal) { }

  openAddUserModal() {
    const modal: NgbModalRef = this.modalService.open(AddUserComponent, { size: 'lg', container: 'nb-layout' });
    (<AddUserComponent>modal.componentInstance).titleForm = 'New User';
    (<AddUserComponent>modal.componentInstance).save.subscribe(data => {
     this.getTableData();
   });
  }

  editUser(user) {
    const modal: NgbModalRef = this.modalService.open(AddUserComponent, { size: 'lg', container: 'nb-layout' });
    (<AddUserComponent>modal.componentInstance).user = user;
    (<AddUserComponent>modal.componentInstance).titleForm = 'Edit User';
    (<AddUserComponent>modal.componentInstance).save.subscribe(data => {
      this.getTableData();
    });
  }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.service.getUsersT()
    .subscribe((data: UserT[]) => {
      this.source.load(data);
    });
  }

}
