import { AddRoleComponent } from './../add-role/add-role.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Role } from '../../../@core/models/role';
import { RoleInfoComponent } from './../role-info/role-info.component';
import { RoleActionsComponent } from './../role-actions.component';
import { UserRoleService } from './../../../@core/data/user-role.service';
import { Response } from '../../../@core/models/response';




@Component({
  selector: 'ngx-user-role',
  templateUrl: './user-role.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class UserRoleComponent implements OnInit {
  settings = {
    hideSubHeader: true,
    actions: false,

    columns: {
      roleName: {
        title: 'Role',
        type: 'string',
        filter: false,
      },
      workMode: {
        title: 'Work Mode',
        type: 'number',
        filter: false,
      },
      basicSalary: {
        title: 'Basic Salary',
        type: 'number',
        filter: false,
      },
      extraHours: {
        title: 'Extra Hours',
        type: 'string',
        filter: false,
      },
      id: {
        title: 'Actions',
        type: 'custom',
        filter: false,
        renderComponent: RoleActionsComponent,
        onComponentInitFunction: (instance) => {
          instance.edit.subscribe(row => {
            this.editRole(row);
          });
          instance.delete.subscribe(row => {
            if (window.confirm('Are you sure you want to delete?')) {
              this.service.deleteRole(row.id).subscribe( data => {
                this.getTableData();
              });
            }
          });
          instance.view.subscribe(row => {
            this.onView(row);
          });
        },
        width: '10%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  @Output() roleSelected = new EventEmitter();

  constructor(private service: UserRoleService,
              private modalService: NgbModal) { }

  openAddRoleModal() {
    const modal: NgbModalRef = this.modalService.open(AddRoleComponent, { size: 'lg', container: 'nb-layout' });
    (<AddRoleComponent>modal.componentInstance).titleForm = 'New Role';
    (<AddRoleComponent>modal.componentInstance).save.subscribe(data => {
     this.getTableData();
   });
  }

  editRole(role) {
    const modal: NgbModalRef = this.modalService.open(AddRoleComponent, { size: 'lg', container: 'nb-layout' });
    (<AddRoleComponent>modal.componentInstance).role = role;
    (<AddRoleComponent>modal.componentInstance).titleForm = 'Edit Role';
    (<AddRoleComponent>modal.componentInstance).save.subscribe(data => {
      this.getTableData();
    });
  }

  onView(row): void {
    const modal: NgbModalRef = this.modalService.open(RoleInfoComponent, { size: 'lg', container: 'nb-layout' });
    (<RoleInfoComponent>modal.componentInstance).role = row;
  }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.service.getRoles()
    .subscribe((roles: Response<Role[]>) => {
      this.source.load(roles.data);
    });
  }

}

