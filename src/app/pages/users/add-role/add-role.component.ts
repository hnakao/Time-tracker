import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from '../../../@core/models/role';
import { UserRoleService } from './../../../@core/data/user-role.service';


@Component({
  selector: 'ngx-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent implements OnInit {


  payHoursWork = 0;
  role: Role;
  titleForm: string;

  @Output() save = new EventEmitter();

  constructor(private activeModal: NgbActiveModal,
              private roleService: UserRoleService) {
    if (!this.role) {
      this.role = new Role('', '', 0, '', 0 );
    }
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

  /* onSubmit() {
    let find = false;
    for (const role of this.roleService.data) {
      if (role.roleName === this.role.roleName ) {
          this.roleService.updateRole(this.role).subscribe( data => {
          this.closeModal();
          this.onSave();
        });
      find = true;
      break;
      }
    }
    if (!find) {
        this.roleService.createRole(this.role).subscribe( data => {
        this.closeModal();
        this.onSave();
       });
    }
 } */

  onItemSelect() {

  }

  onSubmit() {
    if (this.role.id) {
      this.roleService.updateRole(this.role).subscribe( data => {
        this.closeModal();
        this.onSave();
      });
    } else {

      this.roleService.createRole(this.role).subscribe( data => {
        this.closeModal();
        this.onSave();
      });
    }
  }

  onSave() {
    this.save.emit();
  }

}
