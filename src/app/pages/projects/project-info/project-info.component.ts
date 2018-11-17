import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../../@core/models/project';
import { ProjectService } from '../../../@core/data/project.service';




@Component({
  selector: 'ngx-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
})
export class ProjectInfoComponent implements OnInit {

  project: Project;
  titleForm: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() { }

  closeModal() {
    this.activeModal.close();
  }

}
