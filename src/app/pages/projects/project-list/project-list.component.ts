
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ProjectActionsComponent } from '../project-actions.component';
import { ProjectService } from '../../../@core/data/project.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ProjectInfoComponent } from './../project-info/project-info.component';
import { Project } from '../../../@core/models/project';

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


  settings = {
    hideSubHeader: true,
    actions: false,
    /*edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },*/
    columns: {
      projectName: {
        title: 'Project Name',
        type: 'string',
        filter: false,
      },
      estimatedDuration: {
        title: 'Estimated Duration',
        type: 'number',
        filter: false,
      },
      spentTime: {
        title: 'Spent Time',
        type: 'number',
        filter: false,
      },
      userAsig: {
        title: 'Users Assigned',
        type: 'html',
        valuePrepareFunction: (value) => {
          let chip: string = ``;
          if (value.length > 0) {
            for (let i = 0; i < value.length; i++) {
              chip =  `${chip}
                        <div class = "row">
                          <div class = "container">
                          ${value[i].userName}
                          </div>
                        </div>
                      `;
            }
            return chip;
           }
        },
        filter: true,
      },
      _id: {
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
              this.service.deleteProject(row.projectName).subscribe(data => {
                this.source.load(data);
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
    private modalService: NgbModal) {
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
    this.getTableData();
  }

  getTableData() {
    this.service.getProjects()
      .subscribe((data: Project[]) => {
        this.source.load(data);
      });
  }

}
