import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ReportActionsComponent } from '../report-actions.component';
import { AddReportComponent } from '../add-report/add-report.component';
import { ReportInfoComponent } from './../report-info/report-info.component';

import { ReportService } from '../../../@core/data/report.service';
import { Report } from '../../../@core/models/report';

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
  settings = {
    hideSubHeader: true,
    actions: false,

    columns: {
      userName: {
        title: 'Developer Name',
        type: 'string',
        filter: false,
      },
      projectName: {
        title: 'Project Name',
        type: 'string',
        filter: false,
      },
      timeWork: {
        title: 'Time Work',
        type: 'number',
        filter: false,
      },
      _id: {
        type: 'custom',
        filter: false,
        renderComponent: ReportActionsComponent,
        onComponentInitFunction: (instance) => {
          instance.edit.subscribe(row => {
            this.editReport(row);
          });
          instance.delete.subscribe(row => {
            if (window.confirm('Are you sure you want to delete?')) {
              this.service.deleteReport(row.userName).subscribe( data => {
                this.source.load(data);
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
    private modalService: NgbModal) { }

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
    this.getTableData();
  }

  getTableData() {
    this.service.getReports()
    .subscribe((data: Report[]) => {
      this.source.load(data);
    });
  }

}
