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

  basicSalary = 0;
  payHoursWork = 0;
  extraHours = 0;
  payExtraHours = 0;
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

  onItemSelect() {
  }

  onSubmit() {
    this.role.basicSalary = this.basicSalary;
    this.role.extraHours = this.extraHours;
    this.role.payExtraHours = this.payExtraHours;
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
