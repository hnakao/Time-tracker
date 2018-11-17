import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Report } from '../../../@core/models/report';
import { ReportService } from '../../../@core/data/report.service';


@Component({
  selector: 'ngx-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss'],
})
export class AddReportComponent implements OnInit {


  report: Report;
  titleForm: string;



  @Output() save = new EventEmitter();

  constructor(private activeModal: NgbActiveModal,
    private reportService: ReportService) {
    if (!this.report) {
      this.report = new Report('', '', 0, '');
    }
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

  onSubmit() {
    let find = false;
    for (const report of this.reportService.data) {
      if (report.userName === this.report.userName) {
          this.reportService.updateReport(this.report).subscribe( data => {
          this.closeModal();
          this.onSave();
        });
      find = true;
      break;
      }
    }
    if (!find) {
        this.reportService.createReport(this.report).subscribe( data => {
        this.closeModal();
        this.onSave();
      });
    }
  }

  onSave() {
    this.save.emit();
  }
}
