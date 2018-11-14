import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Instance } from '../../../@core/models/instance';
import { exportElement } from './export-element';

@Component({
  selector: 'ngx-instance-info',
  templateUrl: './instance-info.component.html',
  styleUrls: ['./instance-info.component.scss'],
})
export class InstanceInfoComponent implements OnInit {

  @Input() logo: string;
  @Input() instance: Instance;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() { }

  closeModal() {
    this.activeModal.close();
  }

  downloadVumark(element) {
    exportElement(element, this.instance.idVumark/*, { height: 512, width: 512 }*/);
  }

}
