import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Report } from './../../../@core/models/report';
import { ReportService } from './../../../@core/data/report.service';




@Component({
  selector: 'ngx-report-info',
  templateUrl: './report-info.component.html',
  styleUrls: ['./report-info.component.scss'],
})
export class ReportInfoComponent implements OnInit {

  report: Report;
  titleForm: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() { }

  closeModal() {
    this.activeModal.close();
  }
}
