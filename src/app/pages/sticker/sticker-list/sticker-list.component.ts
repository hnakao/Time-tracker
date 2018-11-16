import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { StickerActionsComponent } from '../sticker-actions.component';
import { StickerService } from '../../../@core/data/sticker.service';
import { AddStickerComponent } from '../add-sticker/add-sticker.component';
import { Sticker } from '../../../@core/models/sticker';

@Component({
  selector: 'ngx-sticker-list',
  templateUrl: './sticker-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class StickerListComponent implements OnInit {
  settings = {
    hideSubHeader: true,
    actions: false,
    /*edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },*/
    columns: {
      eventName: {
        title: 'Event Name',
        type: 'string',
        filter: false,
      },
      instanceCount: {
        title: 'Instance Count',
        type: 'number',
        filter: false,
      },
      shareCount: {
        title: 'Share Count',
        type: 'number',
        filter: false,
      },
      idLength: {
        title: 'ID Length',
        type: 'number',
        filter: false,
      },
      _id: {
        type: 'custom',
        filter: false,
        renderComponent: StickerActionsComponent,
        onComponentInitFunction: (instance) => {
          instance.edit.subscribe(row => {
            this.editSticker(row);
          });
          instance.delete.subscribe(row => {
            if (window.confirm('Are you sure you want to delete?')) {
              this.service.deleteSticker(row._id).subscribe( data => {
                this.getTableData();
              });
            }
          });
          instance.view.subscribe(row => {
            this.stickerSelected.emit(row);
          });
          instance.generate.subscribe(row => {
            this.service.generateInstance(row._id).subscribe( data => {
              alert('Generated instances: ' + data['generatedInstances']);
            });
          });
        },
        width: '14%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  @Output() stickerSelected = new EventEmitter();

  constructor(private service: StickerService,
    private modalService: NgbModal) { }

  openAddStickerModal() {
    const modal: NgbModalRef = this.modalService.open(AddStickerComponent, { size: 'lg', container: 'nb-layout' });
   // (<AddStickerComponent>modal.componentInstance).save.subscribe(data => {
   //   this.getTableData();
   // });
  }

  editSticker(sticker) {
    const modal: NgbModalRef = this.modalService.open(AddStickerComponent, { size: 'lg', container: 'nb-layout' });
    (<AddStickerComponent>modal.componentInstance).sticker = sticker;
    (<AddStickerComponent>modal.componentInstance).save.subscribe(data => {
      this.getTableData();
    });
  }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.service.getStickers()
    .subscribe((data: Sticker[]) => {
      this.source.load(data);
    });
  }

}
