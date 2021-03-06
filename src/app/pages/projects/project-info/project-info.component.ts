import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../../@core/models/project';





@Component({
  selector: 'ngx-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
})
export class ProjectInfoComponent implements OnInit {

  project: Project;
  userAsigned = false;
  titleForm: string;
  percent: number;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.progresPercent();
    if (this.project.usersId) {
       this.userAsigned = true;
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  progresPercent() {
    this.percent = this.project.currentSpentTime * 100 / this.project.estimatedDuration;
  }

}
