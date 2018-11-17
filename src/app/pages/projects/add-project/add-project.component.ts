

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../../../@core/models/project';
import { ProjectService } from '../../../@core/data/project.service';

import { UserT } from './../../../@core/models/userT';
import { UserService } from './../../../@core/data/users.service';



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
    idField: 'userName',
    textField: 'userName',
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


  getItemsDropdown() {
      this.userService.getUsersT().subscribe((data: UserT[]) => {
      this.dropdownList = data;
      });
      this.userAssignedItems = this.project.userAsig;
  }

  onSubmit() {
    let find = false;
    this.userAssignedMultiSelect();
    for (const proj of this.projectService.data) {
      if (proj.projectName === this.project.projectName ) {
        this.projectService.updateProject(this.project).subscribe( data => {
          this.closeModal();
          this.onSave();
        });
        find = true;
        break;
      }
    }
    if (!find) {
      this.projectService.createProject(this.project).subscribe( data => {
        this.closeModal();
        this.onSave();
       });
    }
 }

 userAssignedMultiSelect() {
  let user: UserT;
  this.project.userAsig = [];
  for (let i = 0; i < this.userAssignedItems.length; i++) {
      user = new UserT('', '', '', '');
      user.userName = this.userAssignedItems[i];
      this.project.userAsig.push( user );
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
  // this.multiDropdown.pushSelectedItems(this.dropdownList);
  }
}
