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

  logo: string;
  report: Report;
  @Output() save = new EventEmitter();

  constructor(private activeModal: NgbActiveModal,
    private reportService: ReportService) {
    if (!this.report) {
      this.report = new Report('', 0, '');
    }
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

  selectedFile(event) {
    this.logo = event.target.value;
    const temp = this.logo.split('\\');
    this.logo = temp[temp.length - 1];

    this.readThis(event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    // myReader.onloadend = (e) => {
    //   this.report.logoBase64 = myReader.result.toString();
    // };
    // myReader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.report._id) {
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
}
