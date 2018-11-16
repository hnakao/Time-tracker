
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
      project_name: {
        title: 'Project Name',
        type: 'string',
        filter: false,
      },
      estimated_duration: {
        title: 'Estimated Duration',
        type: 'number',
        filter: false,
      },
      spent_time: {
        title: 'Spent Time',
        type: 'number',
        filter: false,
      },
      project_developers: {
        title: 'Project Developers',
        type: 'string',
        filter: false,
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
              this.service.deleteProject(row.project_name).subscribe(data => {
                // this.getTableData();

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
    (<AddProjectComponent>modal.componentInstance).t_form = 'New Project';
    (<AddProjectComponent>modal.componentInstance).save.subscribe(data => {
      this.getTableData();
    });
  }

  editProject(project) {
    const modal: NgbModalRef = this.modalService.open(AddProjectComponent, { size: 'lg', container: 'nb-layout' });
    (<AddProjectComponent>modal.componentInstance).project = project;
    (<AddProjectComponent>modal.componentInstance).t_form = 'Edit Project';
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
        console.log(data);
      });
  }

}
