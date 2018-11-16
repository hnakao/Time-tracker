import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ReportActionsComponent } from '../report-actions.component';
import { ReportService } from '../../../@core/data/report.service';
import { AddReportComponent } from '../add-report/add-report.component';
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
      name_dev: {
        title: 'Developer Name',
        type: 'string',
        filter: false,
      },
      project_name: {
        title: 'Project Name',
        type: 'string',
        filter: false,
      },
      time_work: {
        title: 'Time Work',
        type: 'number',
        filter: false,
      },
      description: {
        title: 'Description',
        type: 'string',
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
              this.service.deleteReport(row._id).subscribe( data => {
                this.getTableData();
              });
            }
          });
          instance.view.subscribe(row => {
            this.reportSelected.emit(row);
          });
          // instance.generate.subscribe(row => {
          //   this.service.generateInstance(row._id).subscribe( data => {
          //     alert('Generated instances: ' + data['generatedInstances']);
          //   });
          // });
        },
        width: '14%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  @Output() reportSelected = new EventEmitter();

  constructor(private service: ReportService,
    private modalService: NgbModal) { }

 /*  openAddReportModal() {
    const modal: NgbModalRef = this.modalService.open(AddReportComponent, { size: 'lg', container: 'nb-layout' });
   // (<AddReportComponent>modal.componentInstance).save.subscribe(data => {
   //   this.getTableData();
   // });
  } */

  editReport(report) {
    const modal: NgbModalRef = this.modalService.open(AddReportComponent, { size: 'lg', container: 'nb-layout' });
    (<AddReportComponent>modal.componentInstance).report = report;
    // (<AddReportComponent>modal.componentInstance).save.subscribe(data => {
    //   this.getTableData();
    // });
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
