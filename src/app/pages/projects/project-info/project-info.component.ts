import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  t_form: string;

  constructor(private activeModal: NgbActiveModal,
              private projectService: ProjectService) { }

  ngOnInit() { }

  closeModal() {
    this.activeModal.close();
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
  }
}
