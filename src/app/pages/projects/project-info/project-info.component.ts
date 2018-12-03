import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../../@core/models/project';
import { User } from '../../../@core/models/user';
import { UserService } from '../../../@core/data/users.service';
import { Response } from '../../../@core/models/response';





@Component({
  selector: 'ngx-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
})
export class ProjectInfoComponent implements OnInit {
  usersId: {id}[];
  project: Project;
  userAsigned: string[];
  titleForm: string;
  percent: number;

  constructor(private activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {
    this.progresPercent();
    this.getUserAsigned();
  }

  getUserAsigned() {
  }

  closeModal() {
    this.activeModal.close();
  }

  progresPercent() {
    this.percent = this.project.currentSpentTime * 100 / this.project.estimatedDuration;
  }

}
