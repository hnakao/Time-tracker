import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ReportActionsComponent } from '../report-actions.component';
import { AddReportComponent } from '../add-report/add-report.component';
import { ReportInfoComponent } from './../report-info/report-info.component';

import { ReportService } from '../../../@core/data/report.service';
import { Report } from '../../../@core/models/report';
import { Response } from '../../../@core/models/response';
import { ProjectService } from '../../../@core/data/project.service';
import { Project } from '../../../@core/models/project';
import { UserService } from '../../../@core/data/users.service';
import { User } from '../../../@core/models/user';

@Component({
  selector: 'ngx-report-list',
  templateUrl: './report-list.component.html',
  styles: ['./add-report.component.scss',
  `
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ReportListComponent implements OnInit {

  private project: Project[];
  userList: User[];

  settings = {
    hideSubHeader: true,
    actions: false,

    columns: {
      userId: {
        title: 'Developer Name',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value && this.userList) {
              for (const user of this.userList) {
                if (user.id === value)
                  return `<div class = "row">
                            <div class = "container">
                              ${user.firstName}
                            </div>
                          </div>`;
              }
          } else {
                  return `<div class = "row">
                                  <div class = "container">
                                      No User
                                  </div>
                                </div>`;

          }
        },
        filter: false,
      },
      projectId: {
        title: 'Project',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value && this.project) {
              for (const proj of this.project) {
                if (proj.id === value)
                  return `<div class = "row">
                            <div class = "container">
                              ${proj.projectName}
                            </div>
                          </div>`;
              }
          }
              return `<div class = "row">
                        <div class = "container">
                          No Project Assigned
                        </div>
                      </div>`;
          },
        filter: true,
      },
      time: {
        title: 'Time Work',
        type: 'number',
        filter: false,
      },
      id: {
        title: 'Actions',
        type: 'custom',
        filter: false,
        renderComponent: ReportActionsComponent,
        onComponentInitFunction: (instance) => {
          instance.edit.subscribe(row => {
            this.editReport(row);
          });
          instance.delete.subscribe(row => {
            if (window.confirm('Are you sure you want to delete?')) {
              this.service.deleteReport(row.id).subscribe( data => {
                this.getTableData();
              });
            }
          });
          instance.view.subscribe(row => {
            this.onView(row);
          });
        },
        width: '14%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  @Output() reportSelected = new EventEmitter();

  constructor(private service: ReportService,
              private modalService: NgbModal,
              private projectService: ProjectService,
              private userService: UserService) { }

  openAddReportModal() {
    const modal: NgbModalRef = this.modalService.open(AddReportComponent, { size: 'lg', container: 'nb-layout' });
    (<AddReportComponent>modal.componentInstance).titleForm = 'New Report';
    (<AddReportComponent>modal.componentInstance).save.subscribe(data => {
      this.getTableData();
    });
  }

  editReport(report) {
    const modal: NgbModalRef = this.modalService.open(AddReportComponent, { size: 'lg', container: 'nb-layout' });
    (<AddReportComponent>modal.componentInstance).report = report;
    (<AddReportComponent>modal.componentInstance).titleForm = 'Edit Report';
    (<AddReportComponent>modal.componentInstance).save.subscribe(data => {
      this.getTableData();
    });
  }

  onView(row): void {
    const modal: NgbModalRef = this.modalService.open(ReportInfoComponent, { size: 'lg', container: 'nb-layout' });
    (<ReportInfoComponent>modal.componentInstance).report = row;
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users: Response<User[]>) => {
      this.userList = users.data;
     });
    this.projectService.getProjects().subscribe((project: Response<Project[]>) => {
      this.project = project.data;
     });
    this.getTableData();
  }

  getTableData() {
    this.service.getReports()
    .subscribe((reports: Response<Report[]>) => {
      this.source.load(reports.data);
    });
  }

}
