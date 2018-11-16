
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../../../@core/models/project';
import { ProjectService } from '../../../@core/data/project.service';
import { MultiselectDropdownService } from './../../../@core/data/multiselect-dropdown.service';


@Component({
  selector: 'ngx-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {


  project: Project;
  t_form: string;

  // user_asig: UserT[] = [];

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  @Output() save = new EventEmitter();

  constructor(private activeModal: NgbActiveModal,
              private projectService: ProjectService,
              private multiDropdown: MultiselectDropdownService) {
    if (!this.project) {
      this.project = new Project('', 0, '');
    }
  }

  ngOnInit() {
    this.dropdownList = this.multiDropdown.getDropdownList();
    this.dropdownSettings = this.multiDropdown.getDropdownSettings();
    this.selectedItems = this.multiDropdown.getSelectedItems();
  }

  closeModal() {
    this.activeModal.close();
  }

 // readThis(inputValue: any): void {
 //   const file: File = inputValue.files[0];
 //   const myReader: FileReader = new FileReader();

    // myReader.onloadend = (e) => {
    //   this.project.logoBase64 = myReader.result.toString();
    // };
    // myReader.readAsDataURL(file);
  // }

  onSubmit() {
    let find = false;
    for (const proj of this.projectService.data) {
      if (proj.project_name === this.project.project_name ) {
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
