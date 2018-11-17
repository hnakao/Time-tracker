import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { StickerService } from '../../../@core/data/sticker.service';
import { Instance } from '../../../@core/models/instance';
import { Sticker } from '../../../@core/models/sticker';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InstanceInfoComponent } from '../instance-info/instance-info.component';
import { InstanceActionsComponent } from '../instance-actions.component';
import { ImageColumnComponent } from '../image-column/image-column.component';

@Component({
  selector: 'ngx-instance-list',
  templateUrl: './instance-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class InstanceListComponent implements OnInit {

  @Input() sticker: Sticker;

  settings = {
    hideSubHeader: true,
    actions: false,
    columns: {
      idVumark: {
        title: 'ID',
        type: 'any',
        filter: false,
      },
      imgUrl: {
        title: 'Image',
        type: 'custom',
        filter: false,
        renderComponent: ImageColumnComponent,
        onComponentInitFunction: (instance) => {
          instance.sticker = this.sticker;
        },
      },
      readCount: {
        title: 'Read Count',
        type: 'number',
        filter: false,
      },
      shareCount: {
        title: 'Share Count',
        type: 'number',
        filter: false,
      },
      stickerState: {
        title: 'State',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value === 0) {
            return `<span class="badge badge-info">Empty</span>`;
          } else if (value === 1) {
            return `<span class="badge badge-primary">Open</span>`;
          } else {
            return `<span class="badge badge-success">Sticked</span>`;
          }
        },
        filter: false,
      },
      owner: {
        title: 'Owner',
        type: 'html',
        valuePrepareFunction: (value) => {
          let owner: string = '-';
          if (value.email) {
            owner = value.email;
          }
          return `<span>${owner}</span>`;
        },
        filter: true,
      },
      _id: {
        type: 'custom',
        filter: false,
        renderComponent: InstanceActionsComponent,
        onComponentInitFunction: (instance) => {
          instance.view.subscribe(row => {
            this.onView(row);
          });
        },
        width: '5%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  @Output() back = new EventEmitter();

  constructor(private stickerService: StickerService,
    private modalService: NgbModal) {

  }

  goBack() {
    this.back.emit();
  }

  onView(row): void {
    const modal: NgbModalRef = this.modalService.open(InstanceInfoComponent, { size: 'sm', container: 'nb-layout' });
    (<InstanceInfoComponent>modal.componentInstance).instance = row;
    (<InstanceInfoComponent>modal.componentInstance).logo = this.sticker.logoBase64;
  }

  ngOnInit() {
    this.stickerService.getInstances(this.sticker._id)
      .subscribe((data: Instance[]) => {
        this.source.load(data);
      });
  }
  onRowSelected() {}

}
