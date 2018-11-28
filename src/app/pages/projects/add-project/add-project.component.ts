

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../../../@core/models/project';
import { ProjectService } from '../../../@core/data/project.service';

import { UserT } from './../../../@core/models/userT';
import { UserService } from './../../../@core/data/users.service';
import { Response } from '../../../@core/models/response';



@Component({
  selector: 'ngx-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {


  project: Project;
  titleForm: string;

  userAssignedItems = [];
  dropdownList = [];

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'firstName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true,
  };


  @Output() save = new EventEmitter();

  constructor(private activeModal: NgbActiveModal,
              private projectService: ProjectService,
              private userService: UserService) {
    if (!this.project) {
      this.project = new Project('', 0, '');
    }
  }

  ngOnInit() {
    this.getItemsDropdown();
  }

  closeModal() {
    this.activeModal.close();
  }


/*   getItemsDropdown() {
    this.userRoleService.getRoles().subscribe((roles: Response<Role[]>) => {
        this.dropdownList = roles.data;
        if (this.user.roleId)
          this.userRoleService.getRole(this.user.roleId).subscribe((role: Response<Role>) => {
            this.roleAssignedItems = [role.data];
          });
    });

  } */

  getItemsDropdown() {
      this.userService.getUsersT().subscribe((users: Response<UserT[]>) => {
        const user2: UserT[] = [];
        for (const user of users.data) {
          if (!user.isDeleted)
            user2.push(user);
          }
        this.dropdownList = user2;

/*         for (let i = 0; i < this.dropdownList.length; i++) {
          for (let j = 0; j < this.project.usersId.length; j++) {
              if (this.dropdownList[i].id === this.project.usersId[j])
                  this.userAssignedItems.push(this.dropdownList[i]);
          }
        } */
      });

  }

 userAssignedMultiSelect() {
  this.project.usersId = [];
  for (let i = 0; i < this.userAssignedItems.length; i++) {
      this.project.usersId.push( this.userAssignedItems[i].id );
  }
 }

 onSubmit() {
  this.userAssignedMultiSelect();
  if (this.project.id) {
      this.projectService.updateProject(this.project).subscribe( data => {
      this.closeModal();
      this.onSave();
    });
  } else {
      this.projectService.createProject(this.project).subscribe( data => {
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
  //  this.multiDropdown.pushSelectedItems(item);
  }

  onSelectAll(item: any) {
  //  this.multiDropdown.pushSelectedItems(this.dropdownList);
  }
}
