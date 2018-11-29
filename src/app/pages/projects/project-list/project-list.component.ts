
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ProjectActionsComponent } from '../project-actions.component';
import { ProjectService } from '../../../@core/data/project.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ProjectInfoComponent } from './../project-info/project-info.component';
import { Project } from '../../../@core/models/project';
import { Response } from '../../../@core/models/response';
import { UserService } from '../../../@core/data/users.service';
import { User } from '../../../@core/models/user';

@Component({
  selector: 'ngx-project-list',
  templateUrl: './project-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ProjectListComponent implements OnInit {

  usersList: User[];
  userAsigned = false;

  settings = {
    hideSubHeader: true,
    actions: false,
    columns: {
      projectName: {
        title: 'Project Name',
        type: 'string',
        filter: false,
      },
      estimatedDuration: {
        title: 'Estimated Duration t/h',
        type: 'number',
        filter: false,
      },
      currentSpentTime: {
        title: 'Spent Time t/h',
        type: 'number',
        filter: false,
      },
      users: {
        title: 'Users Assigned',
        type: 'html',
        valuePrepareFunction: (value) => {
          let chip: string = ``;
          let userName: string;
          if (value) {
            for (const user of this.usersList) {
              for (const val of value) {
                  if (user.id === val.id) {
                    userName = user.firstName;
                    chip =  `${chip}
                        <div class = "row">
                          <div class = "container">
                             ${userName}
                          </div>
                        </div>
                      `;
                  }
                }
              }

            return chip;
            } else {
            return `<div class = "row">
                      <div class = "container">
                        No User Assigned
                      </div>
                    </div>`;
            }
        },
        filter: true,
      },
      id: {
        title: 'Actions',
        type: 'custom',
        filter: false,
        renderComponent: ProjectActionsComponent,
        onComponentInitFunction: (instance) => {
          instance.edit.subscribe(row => {
            this.editProject(row);
          });
          instance.delete.subscribe(row => {
            if (window.confirm('Are you sure you want to delete?')) {
              this.service.deleteProject(row.id).subscribe(data => {
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
  @Output() projectSelected = new EventEmitter();

  constructor(private service: ProjectService,
              private modalService: NgbModal,
              private userService: UserService) {
  }

  openAddProjectModal() {
    const modal: NgbModalRef = this.modalService.open(AddProjectComponent, { size: 'lg', container: 'nb-layout' });
    (<AddProjectComponent>modal.componentInstance).titleForm = 'New Project';
    (<AddProjectComponent>modal.componentInstance).save.subscribe(data => {
      this.getTableData();
    });
  }

  editProject(project) {
    const modal: NgbModalRef = this.modalService.open(AddProjectComponent, { size: 'lg', container: 'nb-layout' });
    (<AddProjectComponent>modal.componentInstance).project = project;
    (<AddProjectComponent>modal.componentInstance).usersId = project.users;
    (<AddProjectComponent>modal.componentInstance).titleForm = 'Edit Project';
    (<AddProjectComponent>modal.componentInstance).save.subscribe(data => {
      this.getTableData();
    });
  }

  onView(row): void {
    const modal: NgbModalRef = this.modalService.open(ProjectInfoComponent, { size: 'lg', container: 'nb-layout' });
    (<ProjectInfoComponent>modal.componentInstance).project = row;
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users: Response<User[]>) => {
      const users2: User[] = [];
      for (const user of users.data) {
        if (!user.isDeleted)
        users2.push(user);
      }
      this.usersList = users2;
      this.getTableData();
  });
  }


  getTableData() {
    this.service.getProjects().subscribe((projects: Response<Project[]>) => {
        this.source.load(projects.data);
      });
  }

}
