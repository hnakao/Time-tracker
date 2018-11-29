import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Report } from '../../../@core/models/report';
import { ReportService } from '../../../@core/data/report.service';
import { ProjectService } from '../../../@core/data/project.service';
import { Project } from '../../../@core/models/project';
import { Response } from '../../../@core/models/response';
import { User } from '../../../@core/models/user';
import { UserService } from '../../../@core/data/users.service';


@Component({
  selector: 'ngx-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss'],
})
export class AddReportComponent implements OnInit {

  user: User;
  report: Report;
  titleForm: string;
  projectList: Project[];

  projectAssignedItems = [];
  dropdownList = [];

  dropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'projectName',
   // selectAllText: 'Select All',
   //  unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true,
  };

  userAssignedItems = [];
  dropdownUserList = [];

  dropdownUserSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'firstName',
   // selectAllText: 'Select All',
   //  unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true,
  };




  @Output() save = new EventEmitter();

  constructor(private activeModal: NgbActiveModal,
              private reportService: ReportService,
              private projectService: ProjectService,
              private userService: UserService) {
    if (!this.report) {
      this.report = new Report('', '', 0, '');
    }
  }

  ngOnInit() {
    this.getItemsDropdown();
  }

  closeModal() {
    this.activeModal.close();
  }

  getItemsDropdown() {
      this.projectService.getProjects().subscribe((projects: Response<Project[]>) => {
           this.dropdownList = projects.data;
           if (this.report.projectId)
              this.projectService.getProject(this.report.projectId).subscribe((project: Response<Project>) => {
                  this.projectAssignedItems = [project.data];
           });
      });

      this.userService.getUsers().subscribe((users: Response<User[]>) => {
        const user2: User[] = [];
        for (const user of users.data) {
            if (!user.isDeleted)
            user2.push(user);
            }
        this.dropdownUserList = user2;
        if (this.report.userId)
           this.userService.getUser(this.report.userId).subscribe((user: Response<User>) => {
               this.userAssignedItems = [user.data];
        });
   });


  }

  projectAssignedMultiSelect() {
    if (this.projectAssignedItems.length !== 0) {
        this.report.projectId = this.projectAssignedItems[0].id;
    } else {
       this.report.projectId = '';
      }

    if (this.userAssignedItems.length !== 0) {
        this.report.userId = this.userAssignedItems[0].id;
    } else {
       this.report.userId = '';
      }
  }

  onSubmit() {
    this.projectAssignedMultiSelect();
    if (this.report.id) {
      this.reportService.updateReport(this.report).subscribe( data => {
        this.closeModal();
        this.onSave();
      });
    } else {
        this.reportService.createReport(this.report).subscribe( data => {
        this.closeModal();
        this.onSave();
      });
    }
  }

  onSave() {
    this.save.emit();
  }

  // projectMultiSelect
  onItemSelect(item: any) {
    // this.roleAssignedItems.push(item);
  }

  onSelectAll(item: any) {
  //  this.multiDropdown.pushSelectedItems(this.dropdownList);
  }

  // userMultiSelect
  onItemSelectUser(item: any) {
    // this.roleAssignedItems.push(item);
  }
  onSelectAllUser(item: any) {
  //  this.multiDropdown.pushSelectedItems(this.dropdownList);
  }

}
