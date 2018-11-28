import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Role } from '../../../@core/models/role';
import { UserT } from '../../../@core/models/userT';
import { UserService } from '../../../@core/data/users.service';
import { UserRoleService } from './../../../@core/data/user-role.service';
import { Response } from '../../../@core/models/response';


@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {


  user: UserT;
  titleForm: string;
  checkPassword: string;
  password: string;

  // Is declared as an arrangement in case several roles are assigned
  roleAssignedItems = [];
  dropdownList = [];

  dropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'roleName',
   // selectAllText: 'Select All',
   //  unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true,
  };

  @Output() save = new EventEmitter();

  constructor(private activeModal: NgbActiveModal,
              private userService: UserService,
              private userRoleService: UserRoleService) {
    if (!this.user) {
      this.user = new UserT('', '', '');
    }
  }

  ngOnInit() {
    this.getItemsDropdown();
  }

  closeModal() {
    this.activeModal.close();
  }

  getItemsDropdown() {
    this.userRoleService.getRoles().subscribe((roles: Response<Role[]>) => {
        this.dropdownList = roles.data;
        if (this.user.roleId)
          this.userRoleService.getRole(this.user.roleId).subscribe((role: Response<Role>) => {
            this.roleAssignedItems = [role.data];
          });
    });

  }

  roleAssignedMultiSelect() {
    if (this.roleAssignedItems.length !== 0) {
        this.user.roleId = this.roleAssignedItems[0].id;
    } else {
      this.user.roleId = '';
    }
  }


  onSubmit() {
    this.roleAssignedMultiSelect();
    if (this.user.id) {
      this.userService.updateUserT(this.user).subscribe( data => {
        this.closeModal();
        this.onSave();
      });
    } else {
      // --no
      this.user.isDeleted = 0;
      // --
      this.userService.createUserT(this.user).subscribe( data => {
        this.closeModal();
        this.onSave();
      });
    }
  }

  onSave() {
    this.save.emit();
  }

    
// MultiSelect
  onItemSelect(item: any) {
    // this.roleAssignedItems.push(item);
  }

  onSelectAll(item: any) {
  //  this.multiDropdown.pushSelectedItems(this.dropdownList);
  }

}
