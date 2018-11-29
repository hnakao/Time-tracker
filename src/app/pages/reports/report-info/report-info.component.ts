import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Report } from './../../../@core/models/report';
import { UserService } from '../../../@core/data/users.service';
import { ProjectService } from '../../../@core/data/project.service';
import { Project } from '../../../@core/models/project';
import { Response } from '../../../@core/models/response';
import { User } from '../../../@core/models/user';


@Component({
  selector: 'ngx-report-info',
  templateUrl: './report-info.component.html',
  styleUrls: ['./report-info.component.scss'],
})
export class ReportInfoComponent implements OnInit {

  report: Report;
  userName: string;
  projectName: string;
  titleForm: string;

  constructor(private activeModal: NgbActiveModal,
              private projectService: ProjectService,
              private userService: UserService) { }

  ngOnInit() {
    this.projectService.getProject(this.report.projectId)
        .subscribe((project: Response<Project>) => {
          this.projectName = project.data.projectName;
        });
    this.userService.getUser(this.report.userId)
        .subscribe((user: Response<User>) => {
          this.userName = user.data.firstName;
        });
  }

  closeModal() {
    this.activeModal.close();
  }
}
